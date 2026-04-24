/* ============================================================
   Cafetería La Flor de Córdoba — Lógica del lado del cliente
   ============================================================ */

(function () {
  "use strict";

  // -----------------------------
  // Menú responsivo (hamburguesa)
  // -----------------------------
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar menú al hacer clic en un enlace (en móvil).
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -----------------------------
  // Validación del formulario
  // -----------------------------
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) return;

  const fields = [
    {
      id: "nombre",
      validate: function (value) {
        if (!value.trim()) return "Por favor escribe tu nombre.";
        if (value.trim().length < 2) return "El nombre es demasiado corto.";
        return "";
      },
    },
    {
      id: "correo",
      validate: function (value) {
        if (!value.trim()) return "Por favor escribe tu correo electrónico.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return "Ingresa un correo electrónico válido.";
        }
        return "";
      },
    },
    {
      id: "mensaje",
      validate: function (value) {
        if (!value.trim()) return "Por favor escribe un mensaje.";
        if (value.trim().length < 10) {
          return "Cuéntanos un poco más (mínimo 10 caracteres).";
        }
        return "";
      },
    },
  ];

  function setFieldError(field, message) {
    const input = document.getElementById(field.id);
    const errorEl = form.querySelector(
      '[data-error-for="' + field.id + '"]'
    );
    const group = input ? input.closest(".form-group") : null;

    if (errorEl) errorEl.textContent = message;
    if (group) group.classList.toggle("has-error", Boolean(message));
  }

  function validateForm() {
    let firstInvalid = null;

    fields.forEach(function (field) {
      const input = document.getElementById(field.id);
      if (!input) return;
      const message = field.validate(input.value);
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = input;
    });

    return firstInvalid;
  }

  // Validación en tiempo real al salir de cada campo.
  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    if (!input) return;
    input.addEventListener("blur", function () {
      setFieldError(field, field.validate(input.value));
    });
    input.addEventListener("input", function () {
      const group = input.closest(".form-group");
      if (group && group.classList.contains("has-error")) {
        setFieldError(field, field.validate(input.value));
      }
    });
  });

  // Envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    feedback.textContent = "";
    feedback.classList.remove("success", "error");

    const firstInvalid = validateForm();

    if (firstInvalid) {
      feedback.textContent = "Por favor revisa los campos marcados.";
      feedback.classList.add("error");
      firstInvalid.focus();
      return;
    }

    // Aquí podrías enviar los datos a un backend o servicio de email.
    // Por ahora simulamos un envío exitoso.
    const data = {
      nombre: document.getElementById("nombre").value.trim(),
      correo: document.getElementById("correo").value.trim(),
      mensaje: document.getElementById("mensaje").value.trim(),
    };

    console.log("Formulario enviado:", data);

    feedback.textContent =
      "¡Gracias " +
      data.nombre +
      "! Recibimos tu mensaje y te responderemos pronto.";
    feedback.classList.add("success");
    form.reset();
  });

  // -----------------------------
  // Año dinámico (opcional, por si se usa en el footer)
  // -----------------------------
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // -----------------------------
  // Header compacto al hacer scroll
  // -----------------------------
  const header = document.querySelector(".site-header");
  if (header) {
    const updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // -----------------------------
  // Scroll-reveal con IntersectionObserver
  // -----------------------------
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: si no hay soporte, mostramos todo de una vez.
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
