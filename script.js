// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
let mobileMenuOpen = false;

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenuOpen) {
      mobileMenu.style.display = 'none';
      mobileMenuOpen = false;
    } else {
      mobileMenu.style.display = 'block';
      mobileMenuOpen = true;
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (mobileMenuOpen) {
      mobileMenu.style.display = 'none';
      mobileMenuOpen = false;
    }

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    header.style.padding = '0.75rem 0';
    header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
  } else {
    header.style.padding = '1.25rem 0';
    header.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
  }
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all filter buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-tags').includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('#skills');

function animateSkillBars() {
  if (!skillsSection || !skillBars.length) return;
  
  const sectionPosition = skillsSection.getBoundingClientRect();
  const screenPosition = window.innerHeight / 1.3;
  
  if (sectionPosition.top < screenPosition) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    
    // Remove scroll event after animation
    window.removeEventListener('scroll', animateSkillBars);
  }
}

window.addEventListener('scroll', animateSkillBars);

// Simple form submission with validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    // Simple validation
    if (!nameField.value.trim()) {
      alert('Please enter your name.');
      return;
    }
    
    if (!emailField.value.trim() || !validateEmail(emailField.value)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    if (!messageField.value.trim()) {
      alert('Please enter your message.');
      return;
    }
    
    // Normally you'd send this to a server, but for demo purposes:
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
  });
}

// Simple email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Trigger animations when elements come into view
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  
  animatedElements.forEach(el => {
    const elementPosition = el.getBoundingClientRect();
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition.top < screenPosition) {
      el.style.animation = el.classList.contains('animate-fade-in')
        ? 'fadeIn 0.5s ease-out forwards'
        : 'slideUp 0.5s ease-out forwards';
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

