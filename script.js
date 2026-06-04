// Tab switching
function switchTab(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    const page = document.getElementById('page-' + name);
    const tab  = document.querySelector('[data-tab="' + name + '"]');
    if (page) page.classList.add('active');
    if (tab)  tab.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inchide meniul mobil
    document.getElementById('tabs').classList.remove('open');
}

// Tab click
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('tabs').classList.toggle('open');
});
