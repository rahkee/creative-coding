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
    const maxTilt = 60;
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
      } else {
        animationId = null; // Reset so new animations can start
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

  // =====================================================
  // ThreeJS Liquid Gradient Background (Scheme 5)
  // =====================================================
  
  const gradientContainer = document.getElementById('gradientContainer');
  
  if (gradientContainer && typeof THREE !== 'undefined') {
    // TouchTexture class for mouse interaction
    class TouchTexture {
      constructor() {
        this.size = 64;
        this.width = this.height = this.size;
        this.maxAge = 64;
        this.radius = 0.25 * this.size;
        this.speed = 1 / this.maxAge;
        this.trail = [];
        this.last = null;
        this.initTexture();
      }

      initTexture() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.texture = new THREE.Texture(this.canvas);
      }

      update() {
        this.clear();
        let speed = this.speed;
        for (let i = this.trail.length - 1; i >= 0; i--) {
          const point = this.trail[i];
          let f = point.force * speed * (1 - point.age / this.maxAge);
          point.x += point.vx * f;
          point.y += point.vy * f;
          point.age++;
          if (point.age > this.maxAge) {
            this.trail.splice(i, 1);
          } else {
            this.drawPoint(point);
          }
        }
        this.texture.needsUpdate = true;
      }

      clear() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      addTouch(point) {
        let force = 0;
        let vx = 0;
        let vy = 0;
        const last = this.last;
        if (last) {
          const dx = point.x - last.x;
          const dy = point.y - last.y;
          if (dx === 0 && dy === 0) return;
          const dd = dx * dx + dy * dy;
          let d = Math.sqrt(dd);
          vx = dx / d;
          vy = dy / d;
          force = Math.min(dd * 20000, 2.0);
        }
        this.last = { x: point.x, y: point.y };
        this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
      }

      drawPoint(point) {
        const pos = {
          x: point.x * this.width,
          y: (1 - point.y) * this.height
        };

        let intensity = 1;
        if (point.age < this.maxAge * 0.3) {
          intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
        } else {
          const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
          intensity = -t * (t - 2);
        }
        intensity *= point.force;

        const radius = this.radius;
        let color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
        let offset = this.size * 5;
        this.ctx.shadowOffsetX = offset;
        this.ctx.shadowOffsetY = offset;
        this.ctx.shadowBlur = radius * 1;
        this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255,0,0,1)";
        this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // LiquidGradient class
    class LiquidGradient {
      constructor(container) {
        this.container = container;
        this.width = container.offsetWidth;
        this.height = container.offsetHeight;
        this.isEnabled = true;
        
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000);
        this.camera.position.z = 50;
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);
        
        this.clock = new THREE.Clock();
        this.touchTexture = new TouchTexture();
        
        // Scheme 5 colors: F15A22 (Orange), 004238 (Dark Teal), 000000 (Black)
        this.uniforms = {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(this.width, this.height) },
          uColor1: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
          uColor2: { value: new THREE.Vector3(0.0, 0.259, 0.22) },    // 004238 - Dark Teal
          uColor3: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
          uColor4: { value: new THREE.Vector3(0.0, 0.0, 0.0) },       // 000000 - Black
          uColor5: { value: new THREE.Vector3(0.945, 0.353, 0.133) }, // F15A22 - Orange
          uColor6: { value: new THREE.Vector3(0.0, 0.0, 0.0) },       // 000000 - Black
          uSpeed: { value: 1.5 },
          uIntensity: { value: 1.8 },
          uTouchTexture: { value: this.touchTexture.texture },
          uGrainIntensity: { value: 0.08 },
          uDarkNavy: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
          uGradientSize: { value: 0.45 },
          uGradientCount: { value: 12.0 },
          uColor1Weight: { value: 0.5 },
          uColor2Weight: { value: 1.8 }
        };
        
        this.init();
      }

      init() {
        const viewSize = this.getViewSize();
        const geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);
        
        const material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              vUv = uv;
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColor4;
            uniform vec3 uColor5;
            uniform vec3 uColor6;
            uniform float uSpeed;
            uniform float uIntensity;
            uniform sampler2D uTouchTexture;
            uniform float uGrainIntensity;
            uniform vec3 uDarkNavy;
            uniform float uGradientSize;
            uniform float uGradientCount;
            uniform float uColor1Weight;
            uniform float uColor2Weight;
            
            varying vec2 vUv;
            
            float grain(vec2 uv, float time) {
              vec2 grainUv = uv * uResolution * 0.5;
              float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
              return grainValue * 2.0 - 1.0;
            }
            
            vec3 getGradientColor(vec2 uv, float time) {
              float gradientRadius = uGradientSize;
              
              vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
              vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
              vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
              vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
              vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
              vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
              vec2 center7 = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
              vec2 center8 = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
              vec2 center9 = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
              vec2 center10 = vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
              vec2 center11 = vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
              vec2 center12 = vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);
              
              float influence1 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center1));
              float influence2 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center2));
              float influence3 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center3));
              float influence4 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center4));
              float influence5 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center5));
              float influence6 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center6));
              float influence7 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center7));
              float influence8 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center8));
              float influence9 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center9));
              float influence10 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center10));
              float influence11 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center11));
              float influence12 = 1.0 - smoothstep(0.0, gradientRadius, length(uv - center12));
              
              vec2 rotatedUv1 = uv - 0.5;
              float angle1 = time * uSpeed * 0.15;
              rotatedUv1 = vec2(rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1), rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1));
              rotatedUv1 += 0.5;
              
              vec2 rotatedUv2 = uv - 0.5;
              float angle2 = -time * uSpeed * 0.12;
              rotatedUv2 = vec2(rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2), rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2));
              rotatedUv2 += 0.5;
              
              float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv1 - 0.5));
              float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, length(rotatedUv2 - 0.5));
              
              vec3 color = vec3(0.0);
              color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
              color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
              color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
              color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
              color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
              color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;
              
              if (uGradientCount > 6.0) {
                color += uColor1 * influence7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
                color += uColor2 * influence8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
                color += uColor3 * influence9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
                color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
              }
              if (uGradientCount > 10.0) {
                color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
                color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
              }
              
              color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
              color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;
              
              color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
              float luminance = dot(color, vec3(0.299, 0.587, 0.114));
              color = mix(vec3(luminance), color, 1.35);
              color = pow(color, vec3(0.92));
              
              float brightness1 = length(color);
              float mixFactor1 = max(brightness1 * 1.2, 0.15);
              color = mix(uDarkNavy, color, mixFactor1);
              
              float maxBrightness = 1.0;
              float brightness = length(color);
              if (brightness > maxBrightness) {
                color = color * (maxBrightness / brightness);
              }
              
              return color;
            }
            
            void main() {
              vec2 uv = vUv;
              
              vec4 touchTex = texture2D(uTouchTexture, uv);
              float vx = -(touchTex.r * 2.0 - 1.0);
              float vy = -(touchTex.g * 2.0 - 1.0);
              float intensity = touchTex.b;
              uv.x += vx * 0.8 * intensity;
              uv.y += vy * 0.8 * intensity;
              
              vec2 center = vec2(0.5);
              float dist = length(uv - center);
              float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
              float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
              uv += vec2(ripple + wave);
              
              vec3 color = getGradientColor(uv, uTime);
              
              float grainValue = grain(uv, uTime);
              color += grainValue * uGrainIntensity;
              
              float timeShift = uTime * 0.5;
              color.r += sin(timeShift) * 0.02;
              color.g += cos(timeShift * 1.4) * 0.02;
              color.b += sin(timeShift * 1.2) * 0.02;
              
              float brightness2 = length(color);
              float mixFactor2 = max(brightness2 * 1.2, 0.15);
              color = mix(uDarkNavy, color, mixFactor2);
              
              color = clamp(color, vec3(0.0), vec3(1.0));
              
              float maxBrightness = 1.0;
              float brightness = length(color);
              if (brightness > maxBrightness) {
                color = color * (maxBrightness / brightness);
              }
              
              gl_FragColor = vec4(color, 1.0);
            }
          `
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        
        this.bindEvents();
        this.tick();
      }

      getViewSize() {
        const fovInRadians = (this.camera.fov * Math.PI) / 180;
        const height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);
        return { width: height * this.camera.aspect, height };
      }

      bindEvents() {
        window.addEventListener('resize', () => this.onResize());
        
        this.container.addEventListener('mousemove', (e) => {
          const rect = this.container.getBoundingClientRect();
          this.touchTexture.addTouch({
            x: (e.clientX - rect.left) / rect.width,
            y: 1 - (e.clientY - rect.top) / rect.height
          });
        });
      }

      onResize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        
        const viewSize = this.getViewSize();
        if (this.mesh) {
          this.mesh.geometry.dispose();
          this.mesh.geometry = new THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1);
        }
        this.uniforms.uResolution.value.set(this.width, this.height);
      }

      tick() {
        if (!this.isEnabled) return;
        const delta = Math.min(this.clock.getDelta(), 0.1);
        this.uniforms.uTime.value += delta;
        this.touchTexture.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.tick());
      }

      disable() {
        this.isEnabled = false;
        this.renderer.domElement.style.opacity = '0';
      }

      enable() {
        this.isEnabled = true;
        this.renderer.domElement.style.opacity = '1';
        this.tick();
      }

      setColorScheme(scheme) {
        // Handle disable (scheme 0)
        if (scheme === 0) {
          this.disable();
          return;
        }

        // Re-enable if was disabled
        if (!this.isEnabled) {
          this.enable();
        }

        const colorSchemes = {
          1: {
            // Orange + Navy Blue
            color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
            color2: new THREE.Vector3(0.039, 0.055, 0.153), // 0a0e27 - Navy Blue
            background: 0x0a0e27,
            darkBase: new THREE.Vector3(0.039, 0.055, 0.153)
          },
          2: {
            // Turquoise + Coral Red-Orange
            color1: new THREE.Vector3(1.0, 0.424, 0.314),   // FF6C50 - Coral Red-Orange
            color2: new THREE.Vector3(0.251, 0.878, 0.816), // 40E0D0 - Turquoise
            background: 0x0a0e27,
            darkBase: new THREE.Vector3(0.039, 0.055, 0.153)
          },
          3: {
            // Orange + Navy + Turquoise
            color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
            color2: new THREE.Vector3(0.039, 0.055, 0.153), // 0a0e27 - Navy Blue
            color3: new THREE.Vector3(0.251, 0.878, 0.816), // 40E0D0 - Turquoise
            background: 0x0a0e27,
            darkBase: new THREE.Vector3(0.039, 0.055, 0.153)
          },
          4: {
            // Orange/Coral + Teal + Beige/Peach
            color1: new THREE.Vector3(0.949, 0.4, 0.2),     // F26633 - Orange/Coral
            color2: new THREE.Vector3(0.176, 0.42, 0.427),  // 2D6B6D - Teal/Blue-Green
            color3: new THREE.Vector3(0.82, 0.686, 0.612),  // D1AF9C - Beige/Peach
            background: 0x2D6B6D,
            darkBase: new THREE.Vector3(0.176, 0.42, 0.427)
          },
          5: {
            // Orange + Dark Teal + Black
            color1: new THREE.Vector3(0.945, 0.353, 0.133), // F15A22 - Orange
            color2: new THREE.Vector3(0.0, 0.259, 0.22),    // 004238 - Dark Teal
            color3: new THREE.Vector3(0.0, 0.0, 0.0),       // 000000 - Black
            background: 0x004238,
            darkBase: new THREE.Vector3(0.0, 0.259, 0.22)
          }
        };

        const colors = colorSchemes[scheme];
        if (!colors) return;

        const uniforms = this.uniforms;

        // Update scene background
        this.scene.background = new THREE.Color(colors.background);
        uniforms.uDarkNavy.value.copy(colors.darkBase);

        // Apply colors based on scheme
        if (scheme === 3) {
          uniforms.uColor1.value.copy(colors.color1);
          uniforms.uColor2.value.copy(colors.color2);
          uniforms.uColor3.value.copy(colors.color3);
          uniforms.uColor4.value.copy(colors.color1);
          uniforms.uColor5.value.copy(colors.color2);
          uniforms.uColor6.value.copy(colors.color3);
        } else if (scheme === 4) {
          uniforms.uColor1.value.copy(colors.color1);
          uniforms.uColor2.value.copy(colors.color2);
          uniforms.uColor3.value.copy(colors.color3);
          uniforms.uColor4.value.copy(colors.color1);
          uniforms.uColor5.value.copy(colors.color2);
          uniforms.uColor6.value.copy(colors.color3);
        } else if (scheme === 5) {
          uniforms.uColor1.value.copy(colors.color1);
          uniforms.uColor2.value.copy(colors.color2);
          uniforms.uColor3.value.copy(colors.color1);
          uniforms.uColor4.value.copy(colors.color3);
          uniforms.uColor5.value.copy(colors.color1);
          uniforms.uColor6.value.copy(colors.color3);
        } else {
          // Schemes 1 and 2 - alternate between 2 colors
          uniforms.uColor1.value.copy(colors.color1);
          uniforms.uColor2.value.copy(colors.color2);
          uniforms.uColor3.value.copy(colors.color1);
          uniforms.uColor4.value.copy(colors.color2);
          uniforms.uColor5.value.copy(colors.color1);
          uniforms.uColor6.value.copy(colors.color2);
        }

        // Adjust settings per scheme
        if (scheme === 1) {
          uniforms.uGradientSize.value = 0.45;
          uniforms.uGradientCount.value = 12.0;
          uniforms.uSpeed.value = 1.5;
          uniforms.uColor1Weight.value = 0.5;
          uniforms.uColor2Weight.value = 1.8;
        } else if (scheme === 2) {
          uniforms.uGradientSize.value = 1.0;
          uniforms.uGradientCount.value = 6.0;
          uniforms.uSpeed.value = 1.2;
          uniforms.uColor1Weight.value = 1.0;
          uniforms.uColor2Weight.value = 1.0;
        } else if (scheme === 5) {
          uniforms.uGradientSize.value = 0.45;
          uniforms.uGradientCount.value = 12.0;
          uniforms.uSpeed.value = 1.5;
          uniforms.uColor1Weight.value = 0.5;
          uniforms.uColor2Weight.value = 1.8;
        } else {
          uniforms.uGradientSize.value = 0.6;
          uniforms.uGradientCount.value = 10.0;
          uniforms.uSpeed.value = 1.3;
          uniforms.uColor1Weight.value = 0.8;
          uniforms.uColor2Weight.value = 1.2;
        }
      }
    }

    // Initialize liquid gradient
    const liquidGradient = new LiquidGradient(gradientContainer);

    // Scheme buttons
    const schemeButtons = document.querySelectorAll('.scheme-btn');
    schemeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const scheme = parseInt(btn.dataset.scheme);
        liquidGradient.setColorScheme(scheme);

        // Update active state
        schemeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
});
