    document.addEventListener('DOMContentLoaded', () => {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

        function initAccordions() {
            const accordionItems = document.querySelectorAll('.accordion-item');
            accordionItems.forEach(item => {
                const header = item.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            });
        }

        function initComparisonSlider() {
            const slider = document.getElementById('comparison-slider');
            if (!slider) return;
            const handle = slider.querySelector('.slider-handle');
            const imageAfter = slider.querySelector('.image-after');
            let isDragging = false;
            
            const moveSlider = (x) => {
                const rect = slider.getBoundingClientRect();
                let newX = x - rect.left;
                if (newX < 0) newX = 0;
                if (newX > rect.width) newX = rect.width;
                const percentage = (newX / rect.width) * 100;
                handle.style.left = `${percentage}%`;
                imageAfter.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            };

            slider.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
            document.addEventListener('mouseup', () => isDragging = false);
            slider.addEventListener('mousemove', (e) => { if (isDragging) moveSlider(e.clientX); });
            slider.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
            document.addEventListener('touchend', () => isDragging = false);
            slider.addEventListener('touchmove', (e) => { if (isDragging) moveSlider(e.touches[0].clientX); });
        }
        
        function initTabs() {
            const tabContainers = document.querySelectorAll('.tabs-container');
            tabContainers.forEach(container => {
                const buttons = container.querySelectorAll('.tab-button');
                buttons.forEach(button => {
                    button.addEventListener('click', () => {
                        container.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                        container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                        button.classList.add('active');
                        container.querySelector(`#tab-${button.dataset.tab}`).classList.add('active');
                    });
                });
            });
        }
        
        function initGoToTopButton() {
            const btn = document.getElementById('to-top-btn');
            if (!btn) return;
            window.addEventListener('scroll', () => {
                btn.classList.toggle('visible', window.scrollY > 300);
            });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        initAccordions();
        initComparisonSlider();
        initTabs();
        initGoToTopButton();
    });


      document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');

      if (item.classList.contains('active')) {
        // Close
        content.style.maxHeight = null;
        item.classList.remove('active');
      } else {
        // Close all other accordions (optional)
        document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
          activeItem.classList.remove('active');
          activeItem.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Open this one
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
