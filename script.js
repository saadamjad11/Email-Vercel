// script.js
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('cf-name').value.trim(),
    email: document.getElementById('cf-email').value.trim(),
    projectType: document.getElementById('cf-type').value,
    message: document.getElementById('cf-message').value.trim()
  };

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = 'Sending Brief...';
  submitBtn.disabled = true;
  formStatus.className = 'form-status';
  formStatus.textContent = 'Sending...';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Unable to send the project brief');
    } else {
      formStatus.textContent = 'Message sent. I will reply soon.';
      formStatus.classList.add('ok');
      contactForm.reset();
    }
  } catch (error) {
    formStatus.textContent = 'Something went wrong. Please email hkhanservices@gmail.com directly.';
    formStatus.classList.add('err');
  } finally {
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
