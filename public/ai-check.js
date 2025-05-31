/*  ai-check.js  – Frontend untuk AI Fact-Checker
    Mengirim klaim ke backend Flask (/cek-fakta) dan menampilkan hasil
--------------------------------------------------------------------- */

const form               = document.getElementById('fact-check-form');
const textarea           = form.querySelector('textarea');
const resultSection      = document.getElementById('result-section');
const verdictCard        = document.querySelector('.verdict-card');
const explanationCard    = document.querySelector('.explanation-card p');
const sourcesCard        = document.querySelector('.sources-card ul');
const checkAnotherButton = document.getElementById('check-another-button');

/* ------------------------------ UTILITAS ------------------------------ */

/** Ubah URL apa pun dalam teks menjadi tag <a>. */
function autolink(text) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    url => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
}

/** Render hasil ke UI. */
function renderResult({ status, explanation, sources }) {
  // Reset & set status card
  verdictCard.className = 'verdict-card';
  if (status.includes('salah')) {
    verdictCard.classList.add('hoax');
    verdictCard.innerHTML = `<i class='bx bxs-x-circle'></i><h3>Klaim Terindikasi Hoax / Misinformasi</h3>`;
  } else if (status.includes('benar')) {
    verdictCard.classList.add('valid');
    verdictCard.innerHTML = `<i class='bx bxs-check-circle'></i><h3>Klaim Terverifikasi Benar</h3>`;
  } else {
    verdictCard.innerHTML = `<i class='bx bxs-help-circle'></i><h3>Status Klaim Tidak Diketahui</h3>`;
  }

  explanationCard.innerHTML = explanation;

  sourcesCard.innerHTML = sources.length
    ? sources.map(src => `<li>${autolink(src)}</li>`).join('')
    : `<li>Tidak ditemukan referensi yang disebutkan.</li>`;

  // Tampilkan blok hasil
  resultSection.classList.remove('hidden');
  form.parentElement.classList.add('hidden');
}

/* ------------------------------ EVENT ------------------------------ */

form.addEventListener('submit', async e => {
  e.preventDefault();

  const claim = textarea.value.trim();
  if (!claim) {
    alert('Tolong masukkan klaim yang ingin dicek.');
    return;
  }

  // Aktifkan indikator loading pada tombol
  const btn = form.querySelector('button');
  btn.textContent = 'Memeriksa...';
  btn.disabled = true;

  try {
    const res = await fetch('/cek-fakta', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ claim })
    });

    const { hasil } = await res.json();
    const reply    = hasil || 'Tidak ada jawaban.';

    // --- Regex parsing hasil ---
    const statusMatch      = reply.match(/Status Klaim:\s*(.*)/i);
    const explanationMatch = reply.match(/Penjelasan:\s*([\s\S]*?)Sumber:/i);
    const sourceMatch      = reply.match(/Sumber:\s*([\s\S]*)$/i);

    const status      = statusMatch ? statusMatch[1].trim().toLowerCase() : 'tidak diketahui';
    const explanation = explanationMatch ? explanationMatch[1].trim() : reply;
    const sources     = sourceMatch ? sourceMatch[1].trim().split('\n').filter(Boolean) : [];

    renderResult({ status, explanation, sources });
  } catch (err) {
    console.error('Gagal memproses:', err);
    alert('Terjadi kesalahan. Silakan coba lagi.');
  } finally {
    btn.textContent = 'Cek Fakta Sekarang';
    btn.disabled = false;
  }
});

checkAnotherButton.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  form.parentElement.classList.remove('hidden');
  textarea.value = '';
});
