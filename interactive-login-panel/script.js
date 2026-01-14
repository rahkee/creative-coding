document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signup-form');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const togglePasswordIcon = togglePasswordBtn.querySelector('i');

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', function() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Toggle icon
    togglePasswordIcon.classList.toggle('fa-eye');
    togglePasswordIcon.classList.toggle('fa-eye-slash');
    
    // Update aria-label
    togglePasswordBtn.setAttribute(
      'aria-label',
      isPassword ? 'Hide password' : 'Show password'
    );
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      terms: formData.get('terms') === 'on'
    };

    // Validate terms checkbox
    if (!data.terms) {
      alert('Please agree to the Terms of Use and Privacy Policy');
      return;
    }

    // Log form data (replace with actual API call)
    console.log('Form submitted:', data);
    
    // Show success feedback
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.textContent = 'Account Created!';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 2000);
    }, 1500);
  });

  // Social button click handlers
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const provider = this.getAttribute('aria-label').replace('Sign up with ', '');
      console.log(`Signing up with ${provider}`);
      // Add actual OAuth implementation here
    });
  });

  // Input focus effects
  const inputGroups = document.querySelectorAll('.input-group');
  inputGroups.forEach(group => {
    const input = group.querySelector('input');
    
    input.addEventListener('focus', function() {
      group.style.boxShadow = '0 0 0 2px rgba(235, 88, 71, 0.2)';
    });
    
    input.addEventListener('blur', function() {
      group.style.boxShadow = 'none';
    });
  });
});
