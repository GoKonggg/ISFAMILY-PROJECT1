// Simulasi: biasanya data ini dilempar pakai localStorage/sessionStorage atau state management
// Asumsi: dari halaman sebelumnya, simpan di localStorage
// localStorage.setItem('health_conditions', JSON.stringify(['lactose intolerant', 'eczema']));
const conditions = JSON.parse(localStorage.getItem('health_conditions')) || ['lactose intolerant'];

// Pertanyaan follow up khusus (tambahkan sesuai kebutuhan)
const followupQuestionsMap = {
  'lactose intolerant': [
    {label: 'How was it diagnosed?', name: 'diagnosed', type: 'text', required: true},
    {label: 'What symptoms appear?', name: 'symptoms', type: 'textarea', required: true},
    {label: 'Has your baby seen a doctor for this?', name: 'doctor_seen', type: 'text', required: false},
    {label: 'Notes (optional):', name: 'notes', type: 'textarea', required: false},
  ],
  'eczema': [
    {label: 'Area of skin affected?', name: 'area', type: 'text', required: true},
    {label: 'Severity (mild, moderate, severe)?', name: 'severity', type: 'text', required: true},
    {label: 'Has your baby used medication?', name: 'medication', type: 'text', required: false},
  ]
};

// Default questions for unknown condition
const defaultFollowupQuestions = [
  {label: 'Please provide more details about this condition:', name: 'details', type: 'textarea', required: true}
];

function createFollowupGroup(condition, idx) {
  const norm = condition.toLowerCase().trim();
  const qlist = followupQuestionsMap[norm] || defaultFollowupQuestions;

  const div = document.createElement('div');
  div.className = 'condition-followup';

  const title = document.createElement('div');
  title.className = 'condition-title';
  title.textContent = `Condition: ${condition}`;
  div.appendChild(title);

  qlist.forEach((q, qIdx) => {
    const group = document.createElement('div');
    group.className = 'followup-group';

    const id = `c${idx}-q${qIdx}`;
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = q.label + (q.required ? ' *' : '');
    group.appendChild(label);

    let input;
    if (q.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 2;
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }
    input.id = id;
    input.name = `followup_${idx}_${q.name}`;
    input.required = !!q.required;
    group.appendChild(input);

    div.appendChild(group);
  });

  return div;
}

document.addEventListener('DOMContentLoaded', () => {
  // Animation
  document.querySelectorAll('.animated-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 120}ms`;
  });

  const followupDiv = document.getElementById('followup-questions');
  conditions.forEach((c, i) => {
    followupDiv.appendChild(createFollowupGroup(c, i));
  });

  document.getElementById('followup-form').addEventListener('submit', function(e){
    e.preventDefault();
    // Serialize follow up answers
    const formData = new FormData(this);
    const answers = {};
    conditions.forEach((c, i) => {
      answers[c] = {};
      const qlist = (followupQuestionsMap[c.toLowerCase().trim()] || defaultFollowupQuestions);
      qlist.forEach(q => {
        const key = `followup_${i}_${q.name}`;
        answers[c][q.name] = formData.get(key);
      });
    });
    // Simpan/lanjut
    console.log('Detail answers:', answers);
    // localStorage.setItem('health_followup', JSON.stringify(answers));
    window.location.href = 'sum.html'; // next step
  });
});
