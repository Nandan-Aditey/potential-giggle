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
        title.textContent = 'Protocol';
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
        { id: 'Intro', title: 'Introduction', children: [
            {id: 'why', title: 'Why ML?'},
            { id: 'challenge-1', title: 'Challenge-1'},
        ]},
        { id: 'XGBoost', title: 'XGBoost Models', children: [
            { id: 'architecture', title: 'Architecture' },
            { id: 'results', title: 'results' },
        ]},
        { id: 'Syntehtic', title: 'Synthetic Data', children: [
            {id: 'nitrite', title: 'Nitrite Metabolism' },
            {id: 'nitrate', title: 'Nitrate Metabolism' }
        ]},
    ];

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

    navStructure.forEach(section => {
    // Main section
    const mainLink = document.createElement('a');
    mainLink.textContent = section.title;
    mainLink.classList.add('sidebar-link');
    
    mainLink.addEventListener('click', e => {
        e.preventDefault(); // prevent default href behavior
        const target = document.getElementById(section.id);
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });

    sidebar.appendChild(mainLink);

    // Children
    if(section.children) {
        const childList = document.createElement('div');
        childList.classList.add('child-links');

        section.children.forEach(child => {
        const childLink = document.createElement('a');
        childLink.textContent = child.title;
        childLink.classList.add('sidebar-child-link');

        childLink.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(child.id);
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });

        childList.appendChild(childLink);
        });

        sidebar.appendChild(childList);
    }
    });


});




document.addEventListener('DOMContentLoaded', () => {
        const accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // This part closes all other open accordions (optional)
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    }
                });

                // Toggle the clicked item
                if (isActive) {
                    // If it's already active, collapse it
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                } else {
                    // If it's not active, expand it to its full content height
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    });