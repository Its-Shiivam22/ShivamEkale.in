// =============================
// ShivamEkale.in Portfolio JS
// Theme, mobile menu, sliders, and FormSubmit contact form
// =============================


// ---------- Theme Toggle ----------
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
root.setAttribute("data-theme", savedTheme);

function updateThemeIcon(theme) {
  if (themeToggle) {
    themeToggle.innerHTML = `<span>${theme === "dark" ? "☀️" : "🌙"}</span>`;
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

// ---------- Mobile Menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}

// ---------- Featured Project Image Sliders ----------
const sliders = document.querySelectorAll("[data-slider]");

sliders.forEach((slider) => {
  const images = slider.querySelectorAll("img");
  if (images.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }, 3500);
});

// ---------- Contact Form ----------
// The contact form uses FormSubmit directly through the form action in index.html.
// No custom backend JavaScript is required for email delivery.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", () => {
    formStatus.textContent = "Submitting your message...";
  });
}
