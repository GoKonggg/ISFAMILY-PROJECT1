document.addEventListener('DOMContentLoaded', () => {
    // === BAGIAN 1: MENGISI DATA KURSUS ===

    // Ambil parameter dari URL
    const params = new URLSearchParams(window.location.search);

    // Ambil semua data dari parameter
    const title = params.get('title');
    const instructorName = params.get('instructorName');
    const instructorImg = params.get('instructorImg');
    const rating = params.get('rating');
    const price = params.get('price');
    const thumbnailImg = params.get('thumbnailImg');
    
    // Pilih elemen di halaman untuk diisi data
    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-instructor-name').textContent = instructorName;
    document.getElementById('detail-instructor-img').src = instructorImg;
    document.getElementById('detail-rating').textContent = rating;
    document.getElementById('detail-price').textContent = price;
    document.getElementById('detail-thumbnail').src = thumbnailImg;


    // === BAGIAN 2: MEMBUAT AKORDION BERFUNGSI ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle class 'active' pada header
            header.classList.toggle('active');

            // Ambil panel konten setelah header
            const content = header.nextElementSibling;

            // Cek apakah panel sudah terbuka atau belum
            if (content.style.maxHeight) {
                // Jika sudah ada isinya (terbuka), tutup
                content.style.maxHeight = null;
            } else {
                // Jika tertutup, buka dengan mengatur max-height
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});