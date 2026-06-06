const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
root.setAttribute('data-theme', savedTheme);
if (themeToggle) {
  themeToggle.innerHTML = `<span>${savedTheme === 'dark' ? '☀️' : '🌙'}</span>`;
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    themeToggle.innerHTML = `<span>${next === 'dark' ? '☀️' : '🌙'}</span>`;
  });
}

document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = [...slider.querySelectorAll('img')];
  let index = 0;

  if (slides.length <= 1) return;

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 3500);
});

/*
  Contact form backend setup:
  1. Create your backend endpoint using API Gateway + Lambda, Formspree, Netlify Forms, or any backend server.
  2. Paste the endpoint URL below.
  3. Keep CORS enabled on your backend for your website domain.
*/
const CONTACT_API_ENDPOINT = ''; // Example: 'https://abc123.execute-api.ap-south-1.amazonaws.com/contact'
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(contactForm).entries());

    if (!CONTACT_API_ENDPOINT) {
      const mailSubject = encodeURIComponent(formData.subject || 'Portfolio Contact Form Message');
      const mailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
      );
      if (formStatus) {
        formStatus.textContent = 'Backend endpoint is not connected yet. Opening email app as fallback.';
      }
      window.location.href = `mailto:shivamekale07@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      return;
    }

    try {
      if (formStatus) formStatus.textContent = 'Sending your message...';

      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Message could not be sent.');
      }

      contactForm.reset();
      if (formStatus) formStatus.textContent = 'Message sent successfully. Thank you!';
    } catch (error) {
      if (formStatus) formStatus.textContent = 'Something went wrong. Please email me directly at shivamekale07@gmail.com.';
    }
  });
}
