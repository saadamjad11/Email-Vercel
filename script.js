// script.js
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Find the selected project type (handling radio buttons or checkboxes)
  const selectedType = e.target.querySelector('input[name="projectType"]:checked');
  const projectType = selectedType ? selectedType.value : 'Not Specified';

  // 2. Gather all input values
  // Make sure your HTML inputs have matching ID attributes (id="name", id="email", id="brief")
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    projectType: projectType,
    message: document.getElementById('brief').value // your project brief textarea
  };

  // 3. Change button to loading state
  const submitBtn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('button');
  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = 'Sending Brief...';
  submitBtn.disabled = true;

  try {
    // 4. Secure post request to Vercel
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert('Project brief sent successfully! I will look over it shortly.');
      e.target.reset(); // clear form inputs
    } else {
      alert('Failed to send brief. Please try again or reach out on WhatsApp.');
    }
  } catch (error) {
    alert('A connection error occurred. Please check your network.');
  } finally {
    // 5. Restore button state
    submitBtn.innerText = originalBtnText;
    submitBtn.disabled = false;
  }
});
