/**
 * Interactive Particle Constellation Network
 * Responsive, Lightweight Canvas Animation with Mouse Interaction
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function getParticleCount() {
    if (window.innerWidth < 640) return 35; // Mobile
    if (window.innerWidth < 1024) return 60; // Tablet
    return 95; // Desktop
  }

  function getColors() {
    const isDark = document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('light');
    return {
      dot: isDark ? 'rgba(99, 102, 241, 0.65)' : 'rgba(99, 102, 241, 0.45)',
      dotAlt: isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(14, 165, 233, 0.5)',
      line: isDark ? 'rgba(99, 102, 241, ' : 'rgba(99, 102, 241, ',
      mouseLine: isDark ? 'rgba(56, 189, 248, ' : 'rgba(14, 165, 233, '
    };
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.isAlt = Math.random() > 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 3;
          this.y -= dirY * force * 3;
        }
      }
    }

    draw(colors) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isAlt ? colors.dotAlt : colors.dot;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles(colors) {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = colors.line + opacity + ')';
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const opacity = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = colors.mouseLine + opacity + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getColors();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(colors);
    }
    connectParticles(colors);

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });
  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  animate();
})();
