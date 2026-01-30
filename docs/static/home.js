    // Wrap letters for hero animation
    function wrapLettersPreserve(root) {
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });

      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach(textNode => {
        const frag = document.createDocumentFragment();
        const parts = textNode.nodeValue.split(/(\s+)/);
        parts.forEach(part => {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const word = document.createElement('span');
            word.className = 'word';
            [...part].forEach(ch => {
              const span = document.createElement('span');
              span.className = 'letter';
              span.textContent = ch;
              word.appendChild(span);
            });
            frag.appendChild(word);
          }
        });
        textNode.parentNode.replaceChild(frag, textNode);
      });
    }
    wrapLettersPreserve(document.querySelector('.hero-title'));

    // Hero letter scaling on cursor hover
    (function () {
      const hero = document.querySelector('.hero-overlay');
      let activeLetter = null;

      hero.addEventListener("mousemove", (e) => {
        const letterEl = document.elementFromPoint(e.clientX, e.clientY);
        if (letterEl && letterEl.classList.contains("letter")) {
          if (activeLetter && activeLetter !== letterEl) {
            activeLetter.style.transform = "";
          }
          activeLetter = letterEl;
          letterEl.style.transform = "scale(1.5)";
          letterEl.style.display = "inline-block";
          letterEl.style.transition = "transform 0.15s ease";
        } else if (activeLetter) {
          activeLetter.style.transform = "";
          activeLetter = null;
        }
      });

      hero.addEventListener("mouseleave", () => {
        if (activeLetter) {
          activeLetter.style.transform = "";
          activeLetter = null;
        }
      });
    })();

    // Bacteria mask + custom cursor
    (function () {
      const hero = document.querySelector(".hero-overlay");
      const mask = document.querySelector(".bacteria-mask");
      if (!hero || !mask) return;

      const CURSOR_SRC = "https://static.igem.wiki/teams/6006/wiki/magnifying-glass.webp";
      const MAX_WIDTH = 100;

      const cursorEl = document.createElement("img");
      cursorEl.src = CURSOR_SRC;
      cursorEl.alt = "";
      Object.assign(cursorEl.style, {
        position: "fixed",
        left: "0",
        top: "0",
        width: MAX_WIDTH + "px",
        height: "auto",
        pointerEvents: "none",
        zIndex: 2500,
        opacity: "0",
        transition: "opacity 120ms ease"
      });
      document.body.appendChild(cursorEl);

      let hotspotX = MAX_WIDTH / 2;
      let hotspotY = MAX_WIDTH / 2;

      cursorEl.onload = () => {
        const ratio = cursorEl.naturalHeight / cursorEl.naturalWidth;
        const actualHeight = MAX_WIDTH * ratio;
        hotspotX = MAX_WIDTH / 2;
        hotspotY = actualHeight / 2;
        cursorEl.style.transform = `translate(-${hotspotX}px, -${hotspotY}px)`;
      };

      function showCursor() {
        hero.style.cursor = "none";
        cursorEl.style.opacity = "1";
      }
      function hideCursor() {
        hero.style.cursor = "";
        cursorEl.style.opacity = "0";
      }

      hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mask.style.setProperty("--x", `${x}px`);
        mask.style.setProperty("--y", `${y}px`);
        mask.classList.add("visible");

        cursorEl.style.left = e.clientX + "px";
        cursorEl.style.top = e.clientY + "px";
        if (cursorEl.style.opacity !== "1") showCursor();
      });

      hero.addEventListener("mouseenter", showCursor);
      hero.addEventListener("mouseleave", () => {
        mask.classList.remove("visible");
        hideCursor();
      });
    })();


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('nitrate-container');
    const path = document.getElementById('wave-path-svg');
    const pathLength = path.getTotalLength();

    const dotCount = 6;

    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        container.appendChild(dot);

        // Clear any green background
        dot.style.background = 'transparent';
        dot.style.width = '30px';
        dot.style.height = '30px';

        // Create the nitrate SVG inside the div
        dot.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 30 30">
            <!-- Nitrogen incenter -->
            <circle cx="15" cy="15" r="5" fill="blue"/>
            <!-- Oxygen atoms at triangle vertices -->
            <circle cx="15" cy="3" r="5" fill="red"/>
            <circle cx="3" cy="25" r="5" fill="red"/>
            <circle cx="27" cy="25" r="5" fill="red"/>
        </svg>`;


        const heightVariation = (Math.random() * 10 - 5)/2;
        const duration = 7500 + Math.random() * 500; // 7–8 seconds
        let startTime = performance.now();

        const startPoint = path.getPointAtLength(0);
        let prevX = startPoint.x;

        function animate(now) {
            const elapsed = now - startTime;
            let progress = elapsed / duration;

            if (progress >= 1) {
                dot.style.opacity = 0; // hide while waiting
                setTimeout(() => {
                    startTime = performance.now();
                    prevX = 0;
                    requestAnimationFrame(animate);
                }, 500 + Math.random() * 1000); // 2–3s wait
                return;
            }

            const distance = pathLength * progress;
            const point = path.getPointAtLength(distance);
            
            const waveOffset = 25;
            dot.style.transform = `translate(${point.x - 15}px, ${point.y + waveOffset + heightVariation}px)`;

            const minHeight = 50; // set this to the minimum y you want
            if (point.y < minHeight) point.y = minHeight;

            // Compute velocity
            const velocityX = point.x - prevX;
            prevX = point.x;

            // Visibility logic based on direction and position
            const leftThreshold = 30;  // start showing after x > 30
            const rightThreshold = container.offsetWidth - 50; // hide when x > width-30
            if (velocityX > 0 && point.x > leftThreshold && point.x < rightThreshold) {
                dot.style.opacity = 1;
            } else {
                dot.style.opacity = 0;
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    for (let i = 0; i < dotCount; i++) {
        setTimeout(createDot, i * 500);
    }
});

// JavaScript to animate the numbers when they scroll into view
const countersSecond = document.querySelectorAll('.stat-card-second');

countersSecond.forEach(card => {
    const counter = card.querySelector('.counter-second');
    if (!counter) return;

    const target = +counter.getAttribute('data-target');
    let hasAnimated = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                card.classList.add('is-visible'); // triggers fill animation

                let currentValue = 0;
                const duration = 1500; // ms
                const stepTime = 20;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const interval = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= target) {
                        currentValue = target;
                        clearInterval(interval);
                    }
                    counter.textContent = Math.round(currentValue);
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(card);
});

// JavaScript to animate the numbers when they scroll into view
const counter = document.querySelectorAll('.stat-card');

counter.forEach(card => {
    const counter = card.querySelector('.counter');
    if (!counter) return;

    const target = +counter.getAttribute('data-target');
    let hasAnimated = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                card.classList.add('is-visible'); // triggers fill animation

                let currentValue = 0;
                const duration = 1500; // ms
                const stepTime = 20;
                const totalSteps = duration / stepTime;
                const increment = target / totalSteps;

                const interval = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= target) {
                        currentValue = target;
                        clearInterval(interval);
                    }
                    counter.textContent = Math.round(currentValue);
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(card);
});

(function () {
    // Data (mg/L)
    const avg = 65;
    const limit = 45;
    const scaleMax = 100; // scale reference (100 mg/L -> 100%)

    // Map value to percent but clamp to >100%
    function toPercent(v){
      const p = (v/scaleMax) * 100;
      return Math.min(Math.max(p, 0), 120); // clamp 0..120%
    }

    const avgBar = document.getElementById('avg-bar');
    const limitBar = document.getElementById('limit-bar');
    const avgLabel = document.getElementById('avg-label');
    const limitLabel = document.getElementById('limit-label');

    // IntersectionObserver to animate when visible
    const el = document.getElementById('nitrate-bars');
    if (!el) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // animate once
        avgBar.style.width = toPercent(avg) + '%';
        limitBar.style.width = toPercent(limit) + '%';
        // update numeric labels with simple counting animation
        animateCount(avgLabel, 0, avg, 900);
        animateCount(limitLabel, 0, limit, 700);
        obs.disconnect();
      });
    }, { threshold: 0.25 });

    io.observe(el);

    // tiny number counter
    function animateCount(node, from, to, duration){
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutQuad
        const eased = 1 - (1 - t) * (1 - t);
        const value = Math.round((from + (to - from) * eased) * 10) / 10;
        node.textContent = value + ' mg/L';
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  })();