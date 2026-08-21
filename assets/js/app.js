/* ==========================================================================
   Equilibrate — app.js
   SOLO lógica de UI: animaciones de scroll, parallax, nav, carrusel y
   estados visuales del formulario.
   La lógica de negocio (envío, persistencia, validación profunda, APIs)
   está delegada a Claude Code — ver los TODO al final del archivo.
   ========================================================================== */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Nav --- */

  function initNav() {
    var header = document.querySelector('[data-header]');
    var nav = document.querySelector('[data-nav]');
    var toggle = document.querySelector('[data-nav-toggle]');
    if (!header) return;

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    return function onScrollNav() {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
  }

  /* ------------------------------------------------------------ Reveals --- */

  function initReveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

    if (reduce) {
      nodes.forEach(function (n) { n.setAttribute('data-reveal', 'shown'); });
      return null;
    }

    return function onScrollReveal(vh) {
      for (var i = nodes.length - 1; i >= 0; i--) {
        var n = nodes[i];
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) {
          var sibs = n.parentElement
            ? Array.prototype.slice.call(n.parentElement.querySelectorAll(':scope > [data-reveal]'))
            : [];
          var k = Math.max(0, sibs.indexOf(n));
          n.style.transitionDelay = Math.min(k * 90, 450) + 'ms';
          n.setAttribute('data-reveal', 'shown');
          nodes.splice(i, 1);
        }
      }
    };
  }

  /* ----------------------------------------------------------- Parallax --- */

  function initParallax() {
    if (reduce) return null;

    var hero = document.querySelector('[data-parallax="hero"]');
    var esencia = document.querySelector('[data-parallax="esencia"]');
    if (!hero && !esencia) return null;

    return function onScrollParallax(vh) {
      // Hero: se desplaza, se achica y se desvanece a medida que lo pasamos.
      if (hero) {
        var sec = hero.closest('section') || hero;
        var top = sec.getBoundingClientRect().top;
        var t = Math.min(1, Math.max(0, -top / (vh * 0.8)));
        var eased = t * t;
        hero.style.transform =
          'translate3d(0,' + (t * 90).toFixed(1) + 'px,0) scale(' + (1 - eased * 0.1).toFixed(3) + ')';
        hero.style.opacity = Math.max(0, 1 - eased * 1.25).toFixed(3);
      }

      // Esencia: micro-parallax de la foto dentro de su marco.
      if (esencia) {
        var r = esencia.getBoundingClientRect();
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        esencia.style.transform = 'translate3d(0,' + (-p * 26).toFixed(1) + 'px,0) scale(1.07)';
      }
    };
  }

  /* ------------------------------------------------- Historia (hero) ---- */

  function initHistoria() {
    var DURACION = 4500;
    var marco = document.querySelector('[data-historia]');
    var riel = marco && marco.querySelector('[data-historia-riel]');
    if (!marco || !riel) return;

    var reales = Array.prototype.slice.call(riel.querySelectorAll('.hero__historia-slide'));
    var btnAnterior = marco.querySelector('[data-historia-prev]');
    var btnSiguiente = marco.querySelector('[data-historia-next]');
    var total = reales.length;
    if (!total) return;

    // Clones al inicio/final del riel para poder deslizar en loop sin saltos.
    var clonUltimo = reales[total - 1].cloneNode(true);
    var clonPrimero = reales[0].cloneNode(true);
    clonUltimo.setAttribute('aria-hidden', 'true');
    clonUltimo.removeAttribute('alt');
    clonPrimero.setAttribute('aria-hidden', 'true');
    clonPrimero.removeAttribute('alt');
    riel.insertBefore(clonUltimo, reales[0]);
    riel.appendChild(clonPrimero);

    var TRANSICION = 620; // un poco más que la transición CSS del riel (.6s)
    var posicion = 1; // 0 = clon último, 1..total = reales, total+1 = clon primero
    var temporizador = null;
    var bloqueado = false;

    function mover(animar) {
      riel.style.transition = animar ? '' : 'none';
      riel.style.transform = 'translateX(-' + (posicion * 100) + '%)';
      if (!animar) void riel.offsetWidth;
    }

    function ir(delta) {
      if (bloqueado) return;
      posicion += delta;
      mover(true);

      // Al llegar a un clon, tras la transición saltamos sin animar
      // a la imagen real equivalente: el efecto de loop infinito.
      if (posicion === 0 || posicion === total + 1) {
        bloqueado = true;
        setTimeout(function () {
          posicion = (posicion === 0) ? total : 1;
          mover(false);
          bloqueado = false;
        }, TRANSICION);
      }
    }

    function programarSiguiente() {
      if (reduce) return;
      clearTimeout(temporizador);
      temporizador = setTimeout(siguiente, DURACION);
    }

    function siguiente() { ir(1); programarSiguiente(); }
    function anterior() { ir(-1); programarSiguiente(); }

    if (btnAnterior) btnAnterior.addEventListener('click', anterior);
    if (btnSiguiente) btnSiguiente.addEventListener('click', siguiente);

    mover(false);

    if (reduce) return;

    marco.addEventListener('mouseenter', function () { clearTimeout(temporizador); });
    marco.addEventListener('mouseleave', programarSiguiente);

    programarSiguiente();
  }

  /* ------------------------------------------------------------ Marquee --- */

  function initMarquee() {
    var track = document.querySelector('[data-marquee]');
    if (!track) return;
    // Duplicamos los items para que el loop del CSS (-50%) sea continuo.
    track.innerHTML += track.innerHTML;
  }

  /* --------------------------------------------------- Motor de scroll --- */

  function initScrollEngine(handlers) {
    var active = handlers.filter(Boolean);
    if (!active.length) return;
    var raf = null;

    function tick() {
      raf = null;
      var vh = window.innerHeight || document.documentElement.clientHeight || 1;
      active.forEach(function (fn) { fn(vh); });
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    }

    // capture: el scroll puede ocurrir en body o en un contenedor, no en window.
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    tick();
  }

  /* ---------------------------------------------------------- Contacto --- */

  function initContactForm() {
    var form = document.querySelector('[data-form]');
    var gracias = document.querySelector('[data-gracias]');
    var nombreOut = document.querySelector('[data-gracias-nombre]');
    var error = document.querySelector('[data-form-error]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (error) error.hidden = true;

      var boton = form.querySelector('button[type="submit"]');
      var textoOriginal = boton ? boton.textContent : '';
      if (boton) {
        boton.disabled = true;
        boton.textContent = 'Enviando…';
      }

      var datos = Object.fromEntries(new FormData(form).entries());

      Promise.resolve(enviarConsulta(datos))
        .then(function () {
          if (nombreOut) {
            nombreOut.textContent = String(datos.nombre || '').trim().split(' ')[0] || '';
          }
          form.hidden = true;
          if (gracias) gracias.hidden = false;
        })
        .catch(function () {
          if (boton) {
            boton.disabled = false;
            boton.textContent = textoOriginal;
          }
          if (error) error.hidden = false;
        });
    });
  }

  /* ======================================================================
     Frontera con el backend — implementación delegada
     ====================================================================== */

  /**
   * Envía la consulta del formulario de contacto.
   * @param {Object} datos - nombre, tel, email, horario, nivel, mensaje
   * @returns {Promise<void>}
   */
  function enviarConsulta(datos) {
    return fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    }).then(function (res) {
      if (!res.ok) throw new Error('No se pudo enviar la consulta.');
    });
  }

  /**
   * Trae los horarios con cupo disponible para poblar el <select> del formulario.
   * @returns {Promise<Array>}
   */
  function obtenerDisponibilidad() {
    // TODO [CLAUDE CODE]: Conectar endpoint del backend aquí.
    return Promise.resolve([]);
  }

  /**
   * Trae las marcas aliadas de la membresía para el carrusel de logos.
   * @returns {Promise<Array>}
   */
  function obtenerMarcasAliadas() {
    // TODO [CLAUDE CODE]: Conectar endpoint del backend aquí.
    return Promise.resolve([]);
  }

  /* ---------------------------------------------------------------- Init -- */

  function init() {
    initMarquee();
    initHistoria();
    initContactForm();
    initScrollEngine([initNav(), initReveal(), initParallax()]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
