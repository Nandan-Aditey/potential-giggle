const scrollLinks = [
  { card: 'idea-1-card', target: 'c1' },
  { card: 'idea-2-card', target: 'c2' },
  { card: 'idea-3-card', target: 'c3' },
  { card: 'decision-card', target: 'decision-section' } // example if you add a decision content section
];

scrollLinks.forEach(link => {
  const cardEl = document.getElementById(link.card);
  const targetEl = document.getElementById(link.target);
  if (cardEl && targetEl) {
    cardEl.addEventListener('click', () => {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('timeline-track');
  const anchors = Array.from(track.querySelectorAll('.timeline-event'));
  const pointer = document.getElementById('time-pointer');
  const progressBar = document.getElementById('progress-bar-timeline');
  const timelineLine = document.getElementById('timeline-line');

  const threadLength = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--thread-length')) || 76;
  const cardGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-gap')) || 16;

  // mapping (must follow anchors order)
  const map = [
    { anchorId: 'idea-1', threadId: 't-idea-1', cardId: 'idea-1-card', side: 'above' },
    { anchorId: 'idea-2', threadId: 't-idea-2', cardId: 'idea-2-card', side: 'below' },
    { anchorId: 'idea-3', threadId: 't-idea-3', cardId: 'idea-3-card', side: 'above' },
    { anchorId: 'decision-point', threadId: 't-decision', cardId: 'decision-card', side: 'below' },
  ];

  const px = v => `${Math.round(v)}px`;

  function layout(){
    const trackRect = track.getBoundingClientRect();
    const trackW = track.clientWidth;
    const centerY = track.clientHeight / 2;

    // evenly distribute anchors across track with padding (1/(n+1), 2/(n+1), ...)
    const n = anchors.length;
    anchors.forEach((a,i) => {
      const frac = (i + 1) / (n + 1);
      const x = Math.round(frac * trackW);
      a.style.left = px(x);
      a.dataset.cx = x;
    });

    const firstX = parseFloat(anchors[0].dataset.cx);
    const lastX = parseFloat(anchors[anchors.length - 1].dataset.cx);

    // position base timeline line from first to last anchor
    timelineLine.style.left = px(firstX);
    timelineLine.style.width = px(Math.max(0, lastX - firstX));

    // set progress bar start at first event
    progressBar.style.left = px(firstX);
    progressBar.style.width = '0px';

    // position threads & cards
    map.forEach(cfg => {
      const anchor = document.getElementById(cfg.anchorId);
      const tx = parseFloat(anchor.dataset.cx);

      const thread = document.getElementById(cfg.threadId);
      const card = document.getElementById(cfg.cardId);

      // thread position & size
      if(cfg.side === 'above'){
        thread.style.left = px(tx);
        thread.style.top = px(centerY - threadLength);
        thread.style.height = px(threadLength);
      } else {
        thread.style.left = px(tx);
        thread.style.top = px(centerY);
        thread.style.height = px(threadLength);
      }

      // card position
      card.style.position = 'absolute';
      card.style.left = px(tx);
      card.style.transform = 'translateX(-50%)';

      // measure height and place above or below thread end
      const cardH = card.offsetHeight;
      if(cfg.side === 'above'){
        const cardTop = centerY - threadLength - cardGap - cardH;
        card.style.top = px(cardTop);
      } else {
        const cardTop = centerY + threadLength + cardGap;
        card.style.top = px(cardTop);
      }
    });

    // pointer initial placement at first anchor
    pointer.style.left = px(firstX);
    pointer.style.top = '50%';

    // min / max
    pointer.dataset.minX = firstX;
    pointer.dataset.maxX = lastX;

    // initial events visibility update
    updateEvents(firstX);
  }

  // show / hide events based on pointer x
  function updateEvents(x) {
    // compute reveal thresholds per anchor (midpoint to previous)
    const cxValues = anchors.map(a => parseFloat(a.dataset.cx));
    // thresholds: for first: firstX - halfGap, others: midpoint with previous
    const thresholds = cxValues.map((cx, i) => {
      if(i === 0){
        const halfGap = (cxValues[i+1] - cxValues[i]) / 2;
        return cx - halfGap;
      } else {
        return (cxValues[i] + cxValues[i-1]) / 2;
      }
    });

    anchors.forEach((a,i) => {
      const cx = cxValues[i];
      const threshold = thresholds[i];
      const { cardId, threadId } = map[i];
      const card = document.getElementById(cardId);
      const thread = document.getElementById(threadId);

      const visible = x >= threshold - 0.5; // small epsilon
      card.style.opacity = visible ? '1' : '0';
      card.style.pointerEvents = visible ? 'auto' : 'none';
      thread.style.opacity = visible ? '1' : '0';
    });

    // progress bar
    const firstX = cxValues[0];
    const pbLeft = firstX;
    const pbWidth = Math.max(0, x - pbLeft);
    progressBar.style.left = px(pbLeft);
    progressBar.style.width = px(pbWidth);

    // grey out ideas 1 & 2 after decision point is reached
    const decisionX = cxValues[cxValues.length - 1];
    const dropped = x >= decisionX - 1;
    ['idea-1-card', 'idea-2-card'].forEach(id => {
      const el = document.getElementById(id);
      if(dropped) el.classList.add('dropped'); else el.classList.remove('dropped');
    });

    // Update pointer ARIA value roughly 0..100
    const span = cxValues[cxValues.length - 1] - cxValues[0];
    let val = span > 0 ? Math.round(((x - cxValues[0]) / span) * 100) : 0;
    val = Math.max(0, Math.min(100, val));
    pointer.setAttribute('aria-valuenow', String(val));
  }

  // clamp helper
  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  // initialize and bind
  layout();

  // relayout on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(layout, 120);
  });

  // dragging state
  let dragging = false;

  function pointerSetTo(x){
    const minX = parseFloat(pointer.dataset.minX);
    const maxX = parseFloat(pointer.dataset.maxX);
    const clamped = clamp(x, minX, maxX);
    pointer.style.left = px(clamped);
    updateEvents(clamped);
  }

  // mouse events
  pointer.addEventListener('mousedown', (e) => { dragging = true; e.preventDefault(); pointer.focus(); });
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', (ev) => {
    if(!dragging) return;
    const rect = track.getBoundingClientRect();
    const xRaw = ev.clientX - rect.left;
    pointerSetTo(xRaw);
  });

  // touch support
  pointer.addEventListener('touchstart', (e) => { dragging = true; pointer.focus(); e.preventDefault(); });
  document.addEventListener('touchend', () => dragging = false);
  document.addEventListener('touchcancel', () => dragging = false);
  document.addEventListener('touchmove', (ev) => {
    if(!dragging) return;
    const rect = track.getBoundingClientRect();
    const touch = ev.touches[0];
    const xRaw = touch.clientX - rect.left;
    pointerSetTo(xRaw);
  }, { passive: false });

  // click on track to jump pointer (animated)
  track.addEventListener('click', (ev) => {
    // avoid clicks originating from pointer itself
    if(ev.target === pointer) return;
    const rect = track.getBoundingClientRect();
    const xRaw = ev.clientX - rect.left;
    const minX = parseFloat(pointer.dataset.minX);
    const maxX = parseFloat(pointer.dataset.maxX);
    const targetX = clamp(xRaw, minX, maxX);

    // animate pointer smoothly
    const start = parseFloat(pointer.style.left) || minX;
    const duration = 300;
    const startTime = performance.now();
    function animate(now){
      const t = Math.min(1, (now - startTime)/duration);
      const ease = t*(2-t); // ease-out
      const cur = start + (targetX - start) * ease;
      pointer.style.left = px(cur);
      updateEvents(cur);
      if(t < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });

  // keyboard control: left/right arrows move pointer to previous/next anchor
  pointer.addEventListener('keydown', (ev) => {
    const cxValues = anchors.map(a => parseFloat(a.dataset.cx));
    const curX = parseFloat(pointer.style.left);
    if(ev.key === 'ArrowLeft' || ev.key === 'Left'){
      // find previous anchor center
      let prev = cxValues[0];
      for(let i=0;i<cxValues.length;i++){
        if(cxValues[i] >= curX - 0.1) { prev = cxValues[Math.max(0,i-1)]; break; }
      }
      // if already at first, stay
      pointerSetTo(prev);
      ev.preventDefault();
    } else if(ev.key === 'ArrowRight' || ev.key === 'Right'){
      // find next anchor center
      let next = cxValues[cxValues.length - 1];
      for(let i=0;i<cxValues.length;i++){
        if(cxValues[i] > curX + 0.1) { next = cxValues[i]; break; }
      }
      pointerSetTo(next);
      ev.preventDefault();
    }
  });

  // clicking a card scrolls to its detail section
  map.forEach(cfg => {
    const card = document.getElementById(cfg.cardId);
    const sectionId = `section-${cfg.cardId.replace('-card','')}`;
    const section = document.getElementById(sectionId);
    // only set up click if section exists
    if(section){
      card.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // show animate-on-scroll elements when in view (small helper)
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting) en.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

  // initial small delay to ensure fonts & layout stable, then layout again
  setTimeout(layout, 60);
});