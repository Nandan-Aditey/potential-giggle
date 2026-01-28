document.querySelectorAll('.cycle-card').forEach(card => {
    const tabs = card.querySelectorAll('.phase-tab');
    const contents = card.querySelectorAll('.phase-content');
    const plasmidDiv = card.querySelector('.plasmid');

    const updatePlasmid = (activeTab) => {
        let phaseClass = '';
        let isComplete = false;

        if (activeTab.dataset.tab.startsWith('design')) {
            phaseClass = 'phase-design';
        } else if (activeTab.dataset.tab.startsWith('build')) {
            phaseClass = 'phase-build';
        } else if (activeTab.dataset.tab.startsWith('test')) {
            phaseClass = 'phase-test';
        } else if (activeTab.dataset.tab.startsWith('learn')) {
            phaseClass = 'phase-learn';
            isComplete = true;
        }

        // Update phase colors
        plasmidDiv.classList.remove('phase-design', 'phase-build', 'phase-test', 'phase-learn');
        plasmidDiv.classList.add(phaseClass);

        if (isComplete) {
            plasmidDiv.classList.add('completed-spin');
            
            setTimeout(() => {
                plasmidDiv.classList.remove('completed-spin');
            }, 1200); // 1200ms matches the animation duration
            
        } else {
            plasmidDiv.classList.remove('completed-spin');
        }
    };
    
    const initialActiveTab = card.querySelector('.phase-tab.active');
    if (initialActiveTab) {
        updatePlasmid(initialActiveTab);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            card.querySelector(`#${tab.dataset.tab}`).classList.add('active');
            
            updatePlasmid(tab);
        });
    });
});

window.addEventListener("scroll", () => {
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
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