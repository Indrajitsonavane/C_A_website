/**
 * ============================================================
 * FILE: assets/js/main.js
 * PURPOSE: Custom JavaScript for the CA Firm website.
 *          Handles: navbar scroll effect, animated counters,
 *          and payment screenshot preview in enrollment modal.
 * ============================================================
 * DEPENDENCIES: Bootstrap 5 (loaded separately in footer.php)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  // ──────────────────────────────────────────────────────────
  // 1. NAVBAR SCROLL EFFECT
  // Adds a CSS class 'scrolled' to the navbar when the user
  // scrolls down more than 50px. This class is used in
  // style.css to add a box-shadow and slightly shrink the nav.
  // ✏️ CUSTOMIZE: Change scroll threshold (50) or class name
  // ──────────────────────────────────────────────────────────
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');    // style.css adds shadow on .scrolled
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // ──────────────────────────────────────────────────────────
  // 2. ANIMATED COUNTER (Count Up Effect)
  // Elements with class="counter-num" and data-target="1200"
  // will animate from 0 up to their target number when they
  // become visible on screen (uses IntersectionObserver).
  //
  // HTML usage example:
  //   <div class="counter-num" data-target="1200" data-suffix="+">0+</div>
  //
  // data-target = final number to count to
  // data-suffix = text appended after the number (e.g. "+" or "%")
  //
  // ✏️ CUSTOMIZE:
  //   - Change 'duration' (ms) to speed up/slow down animation
  //   - Change 'steps' to make animation smoother (higher = smoother)
  // ──────────────────────────────────────────────────────────
  const counters = document.querySelectorAll('.counter-num');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10); // final number
          const suffix = el.getAttribute('data-suffix') || '';          // e.g. "+" or "%"
          const duration = 1500; // ✏️ Animation duration in milliseconds (1500 = 1.5s)
          const steps    = 60;   // ✏️ Number of animation frames
          const stepTime = Math.floor(duration / steps); // time per frame
          let current = 0;

          // setInterval increments the counter each frame
          const timer = setInterval(function () {
            current += Math.ceil(target / steps);
            if (current >= target) {
              current = target; // Snap to exact value at the end
              clearInterval(timer);
            }
            el.textContent = current + suffix; // Update displayed value
          }, stepTime);

          obs.unobserve(el); // Stop observing – only animate once
        }
      });
    }, { threshold: 0.3 }); // ✏️ 0.3 = trigger when 30% of element is visible

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  // ──────────────────────────────────────────────────────────
  // 3. PAYMENT SCREENSHOT PREVIEW
  // When a user selects a payment screenshot in the enrollment
  // modal, this shows a small preview of the image before submitting.
  //
  // Requires: <input type="file" id="payment_screenshot"> and
  //           <img id="previewImg"> in courses.php modal.
  // ──────────────────────────────────────────────────────────
  const fileInput = document.getElementById('payment_screenshot');
  const previewImg = document.getElementById('previewImg');

  if (fileInput && previewImg) {
    fileInput.addEventListener('change', function () {
      const file = this.files[0]; // The file the user selected

      if (file && file.type.startsWith('image/')) {
        // FileReader reads the image as a base64 data URL
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImg.src   = e.target.result; // Set image source to base64 data
          previewImg.style.display = 'block'; // Make preview visible
          // ✏️ CUSTOMIZE: Change preview image size in style.css (.preview-img)
          previewImg.style.maxWidth  = '100%';
          previewImg.style.marginTop = '8px';
          previewImg.style.borderRadius = '8px';
        };
        reader.readAsDataURL(file); // Trigger the read
      }
    });
  }

}); // end DOMContentLoaded
