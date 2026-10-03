/**
 * لمسة إبداع للترميم والدهانات والديكورات بالرياض
 * إشراف المعلم أبو فارس 0559281770
 * كود الجافا سكريبت التفاعلي الرئيسي
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================================================
  // 1. سلايدر الخلفيات المتغيرة في سيكشن الهيرو (Hero Slider)
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.hero-slide-bg');
  let currentSlide = 0;
  const slideIntervalTime = 5000; // 5 ثوانٍ لكل صورة

  function nextHeroSlide() {
    if (heroSlides.length <= 1) return;
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
  }

  if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, slideIntervalTime);
  }

  // ==========================================================================
  // 2. التحكم في الناف بار العائم عند التمرير (Sticky Floating Navbar)
  // ==========================================================================
  const floatingNavbar = document.querySelector('.navbar-floating');
  window.addEventListener('scroll', function () {
    if (!floatingNavbar) return;
    if (window.scrollY > 40) {
      floatingNavbar.classList.add('scrolled');
    } else {
      floatingNavbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 3. إغلاق القائمة الجانبية (Offcanvas) تلقائياً عند النقر على أي رابط
  // ==========================================================================
  const offcanvasElement = document.getElementById('offcanvasNav');
  const offcanvasLinks = document.querySelectorAll('.offcanvas-nav-link');
  if (offcanvasElement && typeof bootstrap !== 'undefined') {
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', () => {
        bsOffcanvas.hide();
      });
    });
  }

  // ==========================================================================
  // 4. نموذج حجز المعاينة المرتبط بالواتساب مباشرة (WhatsApp Form)
  // ==========================================================================
  const bookingForm = document.getElementById('whatsappBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || 'عميل كريم';
      const phone = document.getElementById('clientPhone')?.value.trim() || 'غير محدد';
      const district = document.getElementById('clientDistrict')?.value.trim() || 'الرياض';
      const service = document.getElementById('clientService')?.value || 'استشارة عامة وتشطيب';
      const notes = document.getElementById('clientNotes')?.value.trim() || 'يرجى التواصل لتحديد موعد المعاينة والفحص';

      // بناء رسالة واتساب منسقة باحترافية
      const message = 
`السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وحجز موعد معاينة مجانية من مؤسسة *لمسة إبداع*:
━━━━━━━━━━━━━━━━━━
👤 *الاسم:* ${name}
📱 *رقم الجوال:* ${phone}
📍 *الحي / المنطقة:* ${district}
🎨 *نوع الخدمة:* ${service}
📝 *ملاحظات إضافية:* ${notes}
━━━━━━━━━━━━━━━━━━
الموقع: الرياض - المعلم أبو فارس 0559281770`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/966559281770?text=${encodedMessage}`;

      // فتح محادثة الواتساب في نافذة جديدة
      window.open(whatsappUrl, '_blank');
    });
  }

  // ==========================================================================
  // 5. فتح الصور في لايت بوكس أنيق عند النقر عليها في المعرض
  // ==========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightboxModal && lightboxImg) {
    const bsModal = new bootstrap.Modal(lightboxModal);

    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        const img = item.querySelector('img');
        const title = item.querySelector('h5')?.innerText || 'أعمال لمسة إبداع بالرياض';
        const subtitle = item.querySelector('p')?.innerText || 'ترميم ودهانات وديكورات';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || title;
          if (lightboxCaption) {
            lightboxCaption.innerHTML = `<strong>${title}</strong> - ${subtitle}`;
          }
          bsModal.show();
        }
      });
    });
  }

  // ==========================================================================
  // 6. عدّاد الإحصائيات التفاعلي عند الوصول إلى السيكشن
  // ==========================================================================
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  let countersTriggered = false;

  function runCounters() {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 60);

      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          counter.innerText = prefix + target + suffix;
          clearInterval(timer);
        } else {
          counter.innerText = prefix + count + suffix;
        }
      }, 30);
    });
  }

  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-strip-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // ==========================================================================
  // 7. تحديث سنة حقوق النشر تلقائياً
  // ==========================================================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
