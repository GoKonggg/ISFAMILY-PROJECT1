document.addEventListener('DOMContentLoaded', () => {
  const yesRadio      = document.getElementById('health-yes');
  const noRadio       = document.getElementById('health-no');
  const detailsGroup  = document.getElementById('health-details-group');
  const submitBtn     = document.getElementById('anim-button');

  /* === toggle textarea & ubah label tombol === */
  function toggleDetails(){
    const isYes = yesRadio.checked;
    detailsGroup.style.display = isYes ? 'block' : 'none';
    submitBtn.textContent = isYes ? 'NEXT' : 'NEXT';   // ganti teks kalau mau
  }
  toggleDetails();
  yesRadio.addEventListener('change', toggleDetails);
  noRadio.addEventListener('change', toggleDetails);

  /* === SUBMIT & REDIRECT === */
  document.getElementById('health-form').addEventListener('submit', e=>{
    e.preventDefault();
    if (yesRadio.checked){
      window.location.href = 'health-detail.html';   // halaman form detail
    } else {
      window.location.href = 'interest.html';        // halaman pilih interest topic
    }
  });
});
