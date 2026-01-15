document.addEventListener('DOMContentLoaded', function() {
  // SVG letter animation - add play class on hover, remove when animation ends
  const svg = document.getElementById('a');
  const graphicsPanel = document.querySelector('.graphics-panel');
  const textGroup = document.querySelector('#a .text-group');
  
  if (svg && textGroup) {
    const lastE = textGroup.querySelectorAll('.e')[21]; // Last (22nd) .e element
    
    svg.addEventListener('mouseenter', () => {
      textGroup.classList.add('play');
    });
    
    // Listen for animation end on the last element
    if (lastE) {
      lastE.addEventListener('animationend', () => {
        textGroup.classList.remove('play');
      });
    }
  }

  // 3D tilt effect following mouse cursor with smooth lerping
  if (svg && graphicsPanel) {
    const maxTilt = 30;
    const lerpFactor = 0.15; // Smoothing factor (0-1, lower = smoother)
    
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;
    let animationId = null;
    
    function lerp(current, target, factor) {
      return current + (target - current) * factor;
    }
    
    function animate() {
      currentRotateX = lerp(currentRotateX, targetRotateX, lerpFactor);
      currentRotateY = lerp(currentRotateY, targetRotateY, lerpFactor);
      
      svg.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      
      // Continue animating if values haven't settled
      if (Math.abs(currentRotateX - targetRotateX) > 0.01 || 
          Math.abs(currentRotateY - targetRotateY) > 0.01 || 
          isHovering) {
        animationId = requestAnimationFrame(animate);
      }
    }
    
    graphicsPanel.addEventListener('mousemove', (e) => {
      const rect = graphicsPanel.getBoundingClientRect();
      
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      targetRotateY = x * maxTilt;
      targetRotateX = -y * maxTilt;
      
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    });
    
    graphicsPanel.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!animationId) {
        animationId = requestAnimationFrame(animate);
      }
    });
    
    graphicsPanel.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;
      // Animation continues until values settle back to 0
    });
  }

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
