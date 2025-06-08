// File: explore.js (Versi Final)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Logika untuk Kartu Kategori (Sudah ada sebelumnya) ---
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); 
            const categoryName = card.querySelector('span').textContent.toLowerCase();
            window.location.href = `category.html?category=${encodeURIComponent(categoryName)}`;
        });
    });

    // --- LOGIKA BARU UNTUK SEARCH FORM ---
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', (event) => {
        // Mencegah form mengirim data dengan cara default
        event.preventDefault();

        // Ambil teks yang diketik pengguna
        const query = searchInput.value.trim();

        // Jika pengguna tidak mengetik apa-apa, jangan lakukan apa-apa
        if (query) {
            // Arahkan pengguna ke halaman hasil pencarian dengan query-nya
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });
});