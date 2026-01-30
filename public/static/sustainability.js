document.addEventListener('DOMContentLoaded', function () {

    // --- FEATURE 1: PROGRESS BAR ---
    window.addEventListener("scroll", () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // --- FEATURE 2: CODE BLOCK COPY BUTTON ---
    document.querySelectorAll('main article pre').forEach(block => {
        const code = block.querySelector('code');
        if (!code) return; // Skip if no <code> tag found
        
        const header = document.createElement('div');
        header.className = 'code-header';
        const title = document.createElement('span');
        title.textContent = 'Sections';
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z"/></svg> <span>Copy</span>`;
        
        header.appendChild(title);
        header.appendChild(copyButton);
        block.prepend(header);

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(code.innerText).then(() => {
                copyButton.innerHTML = `<span>Copied!</span>`;
                setTimeout(() => {
                    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5-.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z"/></svg> <span>Copy</span>`;
                }, 2000);
            });
        });
    });
    // --- FEATURE 3: DYNAMIC SIDEBAR & SCROLLSPY ---
    const navStructure = [
        { id: 'sustainable-development-goals', title: 'Sustainable Development Goals', children: [
            {id:'project', title: 'Our Project'}
        ]},
        { id: 'goal-2', title: 'Zero Hunger', children: [
          {id:'stakeholder_1', title: 'Stakeholder 1: Dr. Puthra GT'},
          {id:'stakeholder_2', title: 'Stakeholder 2: Dr. Jamwal', children: [
            {id:'challenge_1', title: 'Challenge #1'},
            {id:'challenge_2', title: 'Challenge #2'},
            {id:'challenge_3', title: 'Challenge #3'}
          ]}
        ]},
        { id: 'goal-3', title: 'Good health and well-being', children: [
          {id:'stakeholder_3', title: 'Stakeholder 1: Dr. Priyanka Jamwal', children: [
            {id:'challenge_4', title: 'Challenge #1'}
          ]},
        ]},
        { id: 'goal-6', title: 'Clean water and sanitation', children: [
          {id:'stakeholder_4', title: 'Stakeholder 1: Suchiradipta Bhattacharjee', children: [
            {id:'challenge_5', title: 'Challenge #1'},
            {id:'challenge_6', title: 'Challenge #2'}
          ]}
        ]},
        { id: 'goal-9', title: 'Innovation and Infrastructure', children: [
          {id:'stakeholder_5', title: 'Stakeholder 1: Dr Puthra GT'},
          {id:'stakeholder_6', title: 'Stakeholder 2: Dr. Rahul Jog', children: [
            {id:'challenge_7', title: 'Challenge #1'},
            {id:'challenge_8', title: 'Challenge #2'}
          ]}
        ]},
        { id: 'goal-12', title: 'Sustainable consumption and production', children: [
          {id:'stakeholder_7', title: 'Stakeholder 1: Gaurang Kulkarni'},
          {id:'stakeholder_8', title: 'Stakeholder 2: Farmers and Public Perception', children: [
            {id:'challenge_9', title: 'Challenge #1'},
            {id:'challenge_10', title: 'Challenge #2'}
          ]}
        ]},
        { id: 'goal-15', title: 'Life below water', children: [
          {id:'stakeholder_9', title: 'Stakeholder 1: TV Ramachandra', children: [
            {id:'challenge_11', title: 'Challenge #1'}
          ]}
        ]},
        { id: 'collaboration', title: 'Collaboration: VIT Vellore' },
        { id: 'conclusion', title: 'Where do we go from here?' }]
    const navContainer = document.getElementById('docs-nav');
    function createNav(items, isSubList = false) {
        const list = document.createElement('ul');
        list.className = isSubList ? 'sub-list collapsed' : 'space-y-1 mt-4';
        items.forEach(item => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${item.id}`;
            if (item.children) {
                const subListId = `sublist-${item.id}`;
                link.setAttribute('data-toggle', 'collapse');
                link.setAttribute('aria-expanded', 'false');
                link.setAttribute('aria-controls', subListId);
                link.innerHTML = `<span>${item.title}</span><svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`;
                listItem.appendChild(link);
                const subList = createNav(item.children, true);
                subList.id = subListId;
                listItem.appendChild(subList);
            } else {
                link.textContent = item.title;
                listItem.appendChild(link);
            }
            list.appendChild(listItem);
        });
        return list;
    }
    const mainNavList = createNav(navStructure);
    const title = document.createElement('h2');
    title.className = 'text-lg font-bold text-gray-900';
    title.textContent = 'Sections';
    navContainer.appendChild(title);
    navContainer.appendChild(mainNavList);
    
    document.querySelectorAll('.docs-sidebar nav a[data-toggle]').forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.preventDefault();
            const targetElement = document.getElementById(toggle.getAttribute('aria-controls'));
            const isCollapsed = targetElement.classList.toggle('collapsed');
            toggle.setAttribute('aria-expanded', !isCollapsed);
        });
    });

    const allLinks = document.querySelectorAll('.docs-sidebar nav a');
    const sections = document.querySelectorAll("main section, main h3, main h4");
    const observer = new IntersectionObserver(entries => {
        let topmostVisibleEntry = null;
        for (const entry of entries) {
            if (entry.isIntersecting && (!topmostVisibleEntry || entry.boundingClientRect.top < topmostVisibleEntry.boundingClientRect.top)) {
                topmostVisibleEntry = entry;
            }
        }
        if (topmostVisibleEntry) {
            const parentSection = topmostVisibleEntry.target.closest('section');
            if (parentSection) {
                const specificLink = document.querySelector(`.docs-sidebar nav a[href="#${topmostVisibleEntry.target.id}"]`);
                document.querySelectorAll('.sub-list').forEach(sublist => {
                    if (!sublist.contains(specificLink)) {
                        sublist.classList.add('collapsed');
                        const toggle = document.querySelector(`[aria-controls="${sublist.id}"]`);
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    }
                });
                allLinks.forEach(l => l.classList.remove('active-section-link', 'active-subsection-link'));
                const mainLink = document.querySelector(`.docs-sidebar nav a[href="#${parentSection.id}"]`);
                if (mainLink) mainLink.classList.add('active-section-link');
                if (specificLink && specificLink !== mainLink) specificLink.classList.add('active-subsection-link');
                let parent = specificLink ? specificLink.closest('.sub-list') : null;
                while (parent) {
                    if (parent.classList.contains('collapsed')) {
                        parent.classList.remove('collapsed');
                        const parentToggle = document.querySelector(`[aria-controls="${parent.id}"]`);
                        if (parentToggle) parentToggle.setAttribute('aria-expanded', 'true');
                    }
                    parent = parent.parentElement.closest('.sub-list');
                }
            }
        }
    }, { rootMargin: "-40% 0px -59% 0px", threshold: [0, 1] });
    sections.forEach(section => { if (section.id) observer.observe(section); });

    // --- FEATURE 4: INITIALIZE ANIMATE ON SCROLL ---
    AOS.init({
        duration: 600,
        once: true,
        offset: 50,
    });

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
