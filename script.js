let clickCount = 0;
const maxClicks = 5;
const counterDisplay = document.getElementById('counterDisplay');
const whatsappBtn = document.getElementById('whatsappBtn');
const form = document.getElementById('registrationForm');
const thankYouMsg = document.getElementById('thankYouMsg');

if (localStorage.getItem('submitted')) {
  form.style.display = 'none';
  thankYouMsg.style.display = 'block';
}

function shareWhatsApp() {
  if (clickCount >= maxClicks) return;
  clickCount++;
  counterDisplay.textContent = 'Click count: ${clickCount}/${maxClicks}';

  const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
  window.open('https://wa.me/?text=${message}', '_blank');

  if (clickCount === maxClicks) {
    whatsappBtn.disabled = true;
    whatsappBtn.textContent = "Sharing complete. Please continue.";
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (clickCount < maxClicks) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const college = document.getElementById('college').value;
  const fileInput = document.getElementById('screenshot');

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('college', college);
  formData.append('file', fileInput.files[0]);

  try {
    // Replace with your Google Apps Script Web App URL
    const response = await fetch('https://script.google.com/macros/s/AKfycbwystnKqG1VcSF19NO6NFyAuMbTY8vDzdLIzaeKee_mkL3TKI_y7ujUzKlkby2iKDZhaA/exec',{
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      localStorage.setItem('submitted', 'true');
      form.reset();
      form.style.display = 'none';
      thankYouMsg.style.display = 'block';
    } else {
      alert("Failed to submit form. Try again.");
    }
  } catch (error) {
    alert("Error submitting form: " + error);
  }
});