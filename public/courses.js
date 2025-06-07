document.addEventListener('DOMContentLoaded', () => {

    // 1. Ambil semua elemen yang diperlukan
    const searchInput = document.getElementById('search-input');
    const levelFilter = document.getElementById('level-filter');
    const categoryFilter = document.getElementById('category-filter');
    const courseCards = document.querySelectorAll('.course-card');

    // 2. Buat fungsi utama untuk memfilter
    const filterCourses = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLevel = levelFilter.value;
        const selectedCategory = categoryFilter.value;

        // 3. Loop melalui setiap kartu kursus
        courseCards.forEach(card => {
            
            // Ambil data dari setiap kartu
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardLevel = card.dataset.level;
            const cardCategory = card.dataset.category;

            // 4. Cek kondisi filter
            const matchesSearch = cardTitle.includes(searchTerm);
            const matchesLevel = (selectedLevel === 'semua') || (selectedLevel === cardLevel);
            const matchesCategory = (selectedCategory === 'semua') || (selectedCategory === cardCategory);

            // 5. Tampilkan atau sembunyikan kartu berdasarkan hasil filter
            if (matchesSearch && matchesLevel && matchesCategory) {
                card.style.display = 'block'; // atau 'flex' jika display aslinya flex
            } else {
                card.style.display = 'none';
            }
        });
    };

    // 6. Tambahkan event listener ke setiap input filter
    searchInput.addEventListener('input', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);

});

// ... (kode filter yang sudah ada sebelumnya) ...

// ===== KODE BARU UNTUK TOMBOL LIHAT DETAIL =====

// Ambil semua tombol "Lihat Detail"
const detailButtons = document.querySelectorAll('.course-button');

detailButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah link pindah halaman secara default

        // Ambil elemen kartu terdekat dari tombol yang diklik
        const card = event.target.closest('.course-card');

        // Kumpulkan semua data dari dalam kartu
        const title = card.querySelector('h3').textContent;
        const level = card.dataset.level;
        const category = card.dataset.category;
        const instructorName = card.querySelector('.instructor-info span').textContent;
        const instructorImg = card.querySelector('.instructor-info img').src;
        const rating = card.querySelector('.course-rating span').textContent;
        const price = card.querySelector('.discount-price').textContent;
        const originalPrice = card.querySelector('.original-price') ? card.querySelector('.original-price').textContent : '';
        const thumbnailImg = card.querySelector('.card-thumbnail img').src;

        // Buat URL dengan parameter yang di-encode
        const params = new URLSearchParams({
            title,
            level,
            category,
            instructorName,
            instructorImg,
            rating,
            price,
            originalPrice,
            thumbnailImg
        });

        // Arahkan ke halaman detail dengan data yang sudah disiapkan
        window.location.href = `course-detail.html?${params.toString()}`;
    });
});