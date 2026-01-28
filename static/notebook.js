document.addEventListener('DOMContentLoaded', () => {
    
    // Handle Month Accordions
    const monthHeaders = document.querySelectorAll('.nb-month-header');
    monthHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('active');
        });
    });

    // Handle Week Accordions
    const weekHeaders = document.querySelectorAll('.nb-week-header');
    weekHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('active');
        });
    });
});