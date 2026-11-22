/**
 * Developer Portfolio - Main Script
 * Handles Theme, Mobile Menu, Typing Effect, Modal, Form & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');

  function updateThemeUI(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-moon text-indigo-400 text-lg transition-transform hover:-rotate-12';
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Current: Dark Mode (Click to toggle)');
      }
      if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-moon text-indigo-400 text-lg';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      if (themeIcon) {
        themeIcon.className = 'fa-solid fa-sun text-yellow-400 text-lg transition-transform hover:rotate-45';
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Current: Light Mode (Click to toggle)');
      }
      if (themeIconMobile) themeIconMobile.className = 'fa-solid fa-sun text-yellow-400 text-lg';
    }
  }

  const savedTheme = localStorage.getItem('dev_portfolio_theme');
  let isDarkMode = savedTheme === 'light' ? false : true;
  updateThemeUI(isDarkMode);

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('dev_portfolio_theme', isDarkMode ? 'dark' : 'light');
    updateThemeUI(isDarkMode);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

  // 2. MOBILE MENU NAVIGATION
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered text-xl"></i>';
      }
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars-staggered text-xl"></i>';
      });
    });
  }

  // 3. TYPING EFFECT
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Web Developer',
      'HTML & CSS Specialist',
      'JavaScript Programmer',
      'Frontend & UI Craftsman',
      'Aspiring Full Stack Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1800; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing new word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // 4. TERMINAL CODE RUNNER
  const runCodeBtn = document.getElementById('run-code-btn');
  const terminalConsole = document.getElementById('terminal-console');

  if (runCodeBtn && terminalConsole) {
    runCodeBtn.addEventListener('click', () => {
      terminalConsole.innerHTML = '<p class="text-cyan-400 font-mono text-xs">&gt; Running Saim Ali developer profile...</p>';
      
      const logs = [
        '&gt; Initializing profile: Saim Ali...',
        '&gt; Tech Stack: HTML5, CSS3, JavaScript, Responsive UI',
        '&gt; WhatsApp: +92 303 7870455 (Verified)',
        '&gt; Email: saimali15janu@gmail.com (Verified)',
        '&gt; Status: Open for Freelance Projects &amp; Web Development! 🚀'
      ];

      logs.forEach((log, index) => {
        setTimeout(() => {
          const p = document.createElement('p');
          p.className = index === logs.length - 1 ? 'text-emerald-400 font-mono text-xs font-semibold' : 'text-gray-300 font-mono text-xs';
          p.innerHTML = log;
          terminalConsole.appendChild(p);
        }, (index + 1) * 350);
      });
    });
  }

  // 5. PROJECT FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-indigo-600', 'text-white');
          b.classList.add('bg-gray-900/60', 'text-gray-400');
        });
        btn.classList.add('active', 'bg-indigo-600', 'text-white');
        btn.classList.remove('bg-gray-900/60', 'text-gray-400');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. CONTACT FORM & TOAST
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;

    const icon = type === 'success' 
      ? '<i class="fa-solid fa-circle-check text-emerald-400 text-xl"></i>'
      : '<i class="fa-solid fa-circle-exclamation text-rose-400 text-xl"></i>';

    toast.innerHTML = `
      ${icon}
      <div class="flex-1 text-sm font-medium">${message}</div>
      <button class="text-gray-400 hover:text-white ml-2 text-xs" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user_name').value.trim();
      const email = document.getElementById('user_email').value.trim();
      const message = document.getElementById('user_message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        contactForm.reset();
        showToast(`Thank you, ${name}! Your message has been sent successfully. Saim Ali will get back to you shortly.`, 'success');
      }, 1000);
    });
  }

  // 7. COPY EMAIL BUTTON
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'saimali15janu@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`, 'success');
      }).catch(() => {
        showToast(`Email: ${email}`, 'success');
      });
    });
  }

  // 8. SCROLL SPY
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-indigo-400', 'font-semibold');
            link.classList.remove('text-gray-300');
          } else {
            link.classList.remove('text-indigo-400', 'font-semibold');
            link.classList.add('text-gray-300');
          }
        });
      }
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  });

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
