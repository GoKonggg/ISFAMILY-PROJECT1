document.addEventListener('DOMContentLoaded', () => {
  // Urutkan animasi
  document.querySelectorAll('.animated-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 120}ms`;
  });

  // Submit handler
  document.getElementById('interest-form').addEventListener('submit', e => {
    e.preventDefault();
    // Ambil data interest terpilih
    const data = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
      .map(cb => cb.value);
    if(data.length === 0) {
      alert('Please select at least one topic!');
      return;
    }
    // Bisa redirect atau simpan data
    console.log('Interests:', data);
    window.location.href = "home.html"; // ganti sesuai tujuan
  });
});
