/* ==========================================================================
   ÉCOLE PRIVÉE FRANCO-ARABE HOUD'ALLAH - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Results Year Tabs Filtering Logic
  const resultsTabBtns = document.querySelectorAll('.results-tab-btn');
  const yearBlocks = document.querySelectorAll('.year-results-block');

  if (resultsTabBtns.length > 0 && yearBlocks.length > 0) {
    resultsTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-year-target');

        resultsTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        yearBlocks.forEach(block => {
          if (target === 'all' || block.id === target) {
            block.style.display = 'block';
          } else {
            block.style.display = 'none';
          }
        });
      });
    });
  }

  // Tuition Fee Calculator Logic
  const calcGrade = document.getElementById('calcGrade');
  const calcRegime = document.getElementById('calcRegime');
  const calcCantine = document.getElementById('calcCantine');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');
  const calcDetailDisplay = document.getElementById('calcDetailDisplay');

  const gradePrices = {
    'jardin': { name: 'Jardin / Maternelle', inscription: 8000, avanceJuin: 0, tenue: 8000, totalInscription: 16000, cycle: 'prescolaire' },
    'ci': { name: 'CI', inscription: 10000, avanceJuin: 0, tenue: 10000, totalInscription: 20000, cycle: 'elementaire' },
    'cp': { name: 'CP', inscription: 11000, avanceJuin: 1000, tenue: 10000, totalInscription: 22000, cycle: 'elementaire' },
    'ce1': { name: 'CE1', inscription: 12000, avanceJuin: 2000, tenue: 10000, totalInscription: 24000, cycle: 'elementaire' },
    'ce2': { name: 'CE2', inscription: 13000, avanceJuin: 3000, tenue: 10000, totalInscription: 26000, cycle: 'elementaire' },
    'cm1_cm2': { name: 'CM1 / CM2', inscription: 15000, avanceJuin: 5000, tenue: 10000, totalInscription: 30000, cycle: 'elementaire' },
    '6e_5e': { name: '6ème / 5ème', inscription: 18000, avanceJuin: 8000, tenue: 10000, totalInscription: 36000, cycle: 'college' },
    '4e': { name: '4ème', inscription: 19000, avanceJuin: 9000, tenue: 10000, totalInscription: 38000, cycle: 'college' },
    '3e': { name: '3ème', inscription: 20000, avanceJuin: 10000, tenue: 10000, totalInscription: 40000, cycle: 'college' }
  };

  const cantinePrices = {
    'elementaire': 15000,
    'college': 20000,
    'prescolaire': 15000
  };

  function updateCalculator() {
    if (!calcGrade || !calcRegime || !calcTotalDisplay) return;

    const gradeKey = calcGrade.value;
    const regimeVal = calcRegime.value;
    const isCantine = calcCantine ? calcCantine.checked : false;

    const gradeData = gradePrices[gradeKey];
    if (!gradeData) return;

    let totalInscription = gradeData.totalInscription;
    let extraInternatFee = 0;
    let extraCantineFee = 0;

    let breakdownText = `Pack Inscription (${gradeData.name}) : ${totalInscription.toLocaleString('fr-FR')} F CFA [Inscription: ${gradeData.inscription.toLocaleString('fr-FR')}F + Tenue: ${gradeData.tenue.toLocaleString('fr-FR')}F + Avance Juin: ${gradeData.avanceJuin.toLocaleString('fr-FR')}F]`;

    if (regimeVal === 'internat') {
      extraInternatFee = 60000;
      breakdownText += ` | Internat mensuel : 60 000 F CFA`;
    }

    if (isCantine && regimeVal !== 'internat') {
      const cycleKey = gradeData.cycle;
      extraCantineFee = cantinePrices[cycleKey] || 15000;
      breakdownText += ` | Cantine : ${extraCantineFee.toLocaleString('fr-FR')} F CFA / mois`;
    }

    const totalEstimate = totalInscription + extraInternatFee + extraCantineFee;

    calcTotalDisplay.textContent = `${totalEstimate.toLocaleString('fr-FR')} F CFA`;
    if (calcDetailDisplay) {
      calcDetailDisplay.textContent = breakdownText;
    }
  }

  if (calcGrade && calcRegime) {
    calcGrade.addEventListener('change', updateCalculator);
    calcRegime.addEventListener('change', updateCalculator);
    if (calcCantine) calcCantine.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // Registration Form Handling & WhatsApp Auto-fill
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const studentNom = document.getElementById('studentNom').value.trim();
      const studentPrenom = document.getElementById('studentPrenom').value.trim();
      const studentDob = document.getElementById('studentDob').value;
      const studentPob = document.getElementById('studentPob').value.trim();
      const studentGender = document.getElementById('studentGender').value;
      const requestedClass = document.getElementById('requestedClass').value;
      const requestedCycle = document.getElementById('requestedCycle').value;
      const regimeChoice = document.getElementById('regimeChoice').value;

      const fatherName = document.getElementById('fatherName').value.trim();
      const motherName = document.getElementById('motherName').value.trim();
      const parentPhone = document.getElementById('parentPhone').value.trim();
      const parentAddress = document.getElementById('parentAddress').value.trim();
      const parentEmail = document.getElementById('parentEmail').value.trim();

      if (!studentNom || !studentPrenom || !parentPhone) {
        showToast('Veuillez remplir tous les champs obligatoires (Nom, Prénom, Téléphone).');
        return;
      }

      // Build formatted WhatsApp message
      const message = `*DEMANDE D'INSCRIPTION 2026/2027 - ÉCOLE HOUD'ALLAH*%0A%0A` +
        `*-- ÉLÈVE --*%0A` +
        `• *Nom & Prénom :* ${studentNom} ${studentPrenom}%0A` +
        `• *Date & Lieu de naissance :* ${studentDob} à ${studentPob}%0A` +
        `• *Sexe :* ${studentGender}%0A` +
        `• *Cycle :* ${requestedCycle}%0A` +
        `• *Classe demandée :* ${requestedClass}%0A` +
        `• *Régime choisi :* ${regimeChoice}%0A%0A` +
        `*-- PARENTS --*%0A` +
        `• *Père :* ${fatherName}%0A` +
        `• *Mère :* ${motherName}%0A` +
        `• *Téléphone WhatsApp :* ${parentPhone}%0A` +
        `• *Adresse :* ${parentAddress}%0A` +
        `• *Email :* ${parentEmail || 'Non renseigné'}`;

      const whatsappUrl = `https://wa.me/221785427272?text=${message}`;

      // Open WhatsApp modal / link
      showRegistrationConfirmationModal({
        studentName: `${studentPrenom} ${studentNom}`,
        requestedClass: requestedClass,
        regime: regimeChoice,
        whatsappUrl: whatsappUrl
      });
    });
  }

  // About Section Carousel Initialization
  const aboutCarousel = document.getElementById('aboutCarousel');
  if (aboutCarousel) {
    const track = aboutCarousel.querySelector('.about-carousel-track');
    const slides = aboutCarousel.querySelectorAll('.about-carousel-slide');
    const prevBtn = aboutCarousel.querySelector('.carousel-control-btn.prev');
    const nextBtn = aboutCarousel.querySelector('.carousel-control-btn.next');
    const dotsContainer = aboutCarousel.querySelector('.carousel-dots');
    const thumbs = aboutCarousel.querySelectorAll('.carousel-thumb');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;

    // Create pagination dots dynamically
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Aller à la diapositive ${idx + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(idx);
          resetAutoplay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Update active dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });

      // Update active thumbnail
      thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
      });
    }

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoplay();
      });
    });

    // Autoplay feature (rotates every 4.5 seconds)
    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4500);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    aboutCarousel.addEventListener('mouseenter', stopAutoplay);
    aboutCarousel.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe Navigation for mobile devices
    let startX = 0;
    let endX = 0;

    aboutCarousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    aboutCarousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  // HD Lightbox Modal Logic
  const lightboxModal = document.getElementById('photoLightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  function collectPageImages() {
    const selector = '.about-carousel img, .tahfiz-img, .program-banner-img, .card-img-header, .carousel-thumb img';
    const images = document.querySelectorAll(selector);
    currentGalleryImages = [];
    const seenSrcs = new Set();
    
    images.forEach(img => {
      if (img.src && !seenSrcs.has(img.src)) {
        seenSrcs.add(img.src);
        
        let caption = img.alt || 'École Privée Franco-Arabe HOUD\'ALLAH';
        const slideTitle = img.closest('.about-carousel-slide')?.querySelector('.carousel-caption-title')?.innerText;
        const cardTitle = img.closest('.program-detailed-card, .vie-scolaire-card, .regime-card')?.querySelector('.program-title, h3')?.innerText;
        
        if (slideTitle) {
          caption = slideTitle;
        } else if (cardTitle) {
          caption = cardTitle;
        }

        currentGalleryImages.push({
          src: img.src,
          alt: img.alt || 'Photo École Houdallah',
          caption: caption
        });
      }
    });
  }

  function openLightbox(index) {
    if (currentGalleryImages.length === 0) collectPageImages();
    if (index < 0) index = currentGalleryImages.length - 1;
    if (index >= currentGalleryImages.length) index = 0;

    currentImageIndex = index;
    const item = currentGalleryImages[currentImageIndex];
    if (item && lightboxImage && lightboxModal) {
      lightboxImage.src = item.src;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      lightboxModal.classList.add('active');
    }
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (lightboxModal) {
    document.addEventListener('click', (e) => {
      const selector = '.about-carousel-slide img, .tahfiz-img, .program-banner-img, .card-img-header, .carousel-thumb img';
      const targetImg = e.target.closest(selector);
      if (targetImg) {
        collectPageImages();
        const foundIdx = currentGalleryImages.findIndex(item => item.src === targetImg.src);
        openLightbox(foundIdx >= 0 ? foundIdx : 0);
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightbox(currentImageIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => openLightbox(currentImageIndex + 1));

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-container') || e.target.classList.contains('lightbox-image-wrapper')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentImageIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentImageIndex + 1);
    });
  }
});

// Toast Helper Function
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal helper for Registration Confirmation
function showRegistrationConfirmationModal(data) {
  let modal = document.getElementById('confirmModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'confirmModal';
    modal.className = 'modal active';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="padding: 2.5rem; text-align: center; max-width: 550px;">
      <button class="modal-close" onclick="document.getElementById('confirmModal').classList.remove('active')">&times;</button>
      <div style="font-size: 3.5rem; color: #25D366; margin-bottom: 1rem;">
        <i class="fa-brands fa-whatsapp"></i>
      </div>
      <h3 style="font-size: 1.6rem; color: #064e3b; margin-bottom: 0.75rem;">Demande Inscription Prête !</h3>
      <p style="color: #64748b; margin-bottom: 1.5rem; font-size: 1rem;">
        Merci ! La demande pour <strong>${data.studentName}</strong> (${data.requestedClass} - ${data.regime}) a été générée avec succès.
      </p>
      <p style="font-weight: 600; color: #064e3b; margin-bottom: 2rem;">
        Cliquez ci-dessous pour transmettre immédiatement votre demande au service des inscriptions sur WhatsApp.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="${data.whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg">
          <i class="fa-brands fa-whatsapp"></i> Envoyer sur WhatsApp
        </a>
        <button onclick="document.getElementById('confirmModal').classList.remove('active')" class="btn btn-outline">
          Fermer
        </button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}
