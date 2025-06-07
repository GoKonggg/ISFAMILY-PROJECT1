// Menunggu semua konten HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // KODE UNTUK HALAMAN: chat-dokter.html
    // ======================================================
    if (document.querySelector('.doctor-list')) {
        const doctorCards = document.querySelectorAll('.doctor-card');

        doctorCards.forEach(card => {
            const chatButton = card.querySelector('.chat-button');
            
            // Jangan tambahkan listener jika tombolnya disabled
            if (chatButton && !chatButton.classList.contains('disabled')) {
                chatButton.addEventListener('click', (event) => {
                    event.preventDefault(); // Mencegah link pindah halaman secara langsung

                    // Ambil data dari card yang diklik
                    const doctorName = card.querySelector('.doctor-info h3').textContent;
                    const doctorImgSrc = card.querySelector('img').src;

                    // Buat URL dengan parameter (query string)
                    const url = `chat-room.html?name=${encodeURIComponent(doctorName)}&img=${encodeURIComponent(doctorImgSrc)}`;

                    // Arahkan browser ke halaman chat
                    window.location.href = url;
                });
            }
        });
    }


    // ======================================================
    // KODE UNTUK HALAMAN: chat-room.html
    // ======================================================
    if (document.querySelector('.chat-container')) {
        const params = new URLSearchParams(window.location.search);
        const doctorName = params.get('name');
        const doctorImg = params.get('img');

        // Update header chat dengan data dokter
        document.getElementById('chat-doctor-name').textContent = doctorName;
        document.getElementById('chat-doctor-img').src = doctorImg;

        const messagesContainer = document.getElementById('messages-container');
        const messageForm = document.getElementById('message-form');
        const messageInput = document.getElementById('message-input');
        
        // Fungsi untuk menambah pesan ke layar
        const addMessage = (text, sender) => {
            const bubble = document.createElement('div');
            bubble.classList.add('message-bubble', sender);
            bubble.textContent = text;
            messagesContainer.appendChild(bubble);
            // Auto-scroll ke pesan terakhir
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        // --- Simulasi Percakapan Awal ---
        setTimeout(() => {
            addMessage(`Halo, selamat datang di isFamily. Saya ${doctorName}. Ada yang bisa saya bantu?`, 'doctor');
        }, 1000); // Pesan pertama muncul setelah 1 detik

        setTimeout(() => {
            addMessage('Halo dok, saya mau konsultasi mengenai...', 'user');
        }, 2500); // Pesan balasan (simulasi) muncul setelah 2.5 detik


        // --- Menangani Pengiriman Pesan oleh Pengguna ---
        messageForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userMessage = messageInput.value;

            if (userMessage.trim() !== '') {
                addMessage(userMessage, 'user');
                messageInput.value = ''; // Kosongkan input field

                // Simulasi balasan dari dokter
                setTimeout(() => {
                    addMessage('Baik, saya mengerti. Bisa dijelaskan lebih detail lagi keluhannya?', 'doctor');
                }, 1500);
            }
        });
    }
});