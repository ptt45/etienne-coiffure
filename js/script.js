/* ============================================================
   Etienne Coiffure — Script principal
   ============================================================ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Année du footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Fermer le menu après un clic sur un lien
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Horaires : jour en cours + statut ouvert / fermé ---------- */
  // Plages d'ouverture : index = jour JS (0 = dimanche), [début, fin] en minutes
  const OPENING_HOURS = {
    0: null,                                          // dimanche : fermé
    1: [[540, 1140]],                                // lundi : 09:00 – 19:00
    2: [[540, 720], [810, 1140]],                     // 09:00 – 12:00 · 13:30 – 19:00
    3: [[540, 720], [810, 1140]],
    4: [[540, 720], [810, 1140]],
    5: [[540, 720], [810, 1140]],
    6: [[540, 720], [810, 1140]],
  };

  const now = new Date();
  const todayRow = document.querySelector(`.hours tr[data-day="${now.getDay()}"]`);
  if (todayRow) todayRow.classList.add("today");

  const statusEl = document.getElementById("openStatus");
  if (statusEl) {
    const minutes = now.getHours() * 60 + now.getMinutes();
    const ranges = OPENING_HOURS[now.getDay()] || null;
    const isOpen = Array.isArray(ranges) && ranges.some(([s, e]) => minutes >= s && minutes < e);

    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    if (isOpen) {
      statusEl.textContent = "🟢 Actuellement ouvert — appelez ou passez au salon !";
      statusEl.classList.add("is-open");
    } else {
      statusEl.textContent = `🔴 Actuellement fermé — le salon vous attend le ${days[now.getDay()]} ou le jour suivant selon les horaires ci-dessus.`;
      statusEl.classList.add("is-closed");
    }
  }

  /* ---------- Formulaire de contact (validation côté client) ---------- */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (form && formStatus) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      if (name.length < 2) {
        formStatus.textContent = "Merci d'indiquer votre nom (2 caractères minimum).";
        formStatus.className = "form-status error";
        form.name.focus();
        return;
      }
      if (!/^[0-9\s+\.\-]{8,}$/.test(phone)) {
        formStatus.textContent = "Merci d'indiquer un numéro de téléphone valide.";
        formStatus.className = "form-status error";
        form.phone.focus();
        return;
      }
      if (message.length < 5) {
        formStatus.textContent = "Merci d'écrire un court message.";
        formStatus.className = "form-status error";
        form.message.focus();
        return;
      }

      // Site statique : on oriente le client vers le téléphone.
      formStatus.textContent =
        "Merci ! Pour une réponse rapide, appelez le 07 49 92 58 12 ou passez directement au salon.";
      formStatus.className = "form-status ok";
      form.reset();
    });
  }

  /* ---------- Surbrillance des liens de navigation (scroll) ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${entry.target.id}` ? "var(--or)" : "";
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }
});
