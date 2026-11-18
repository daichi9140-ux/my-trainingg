const form = document.getElementById('workout-form');
const records = document.getElementById('records');
const clearButton = document.getElementById('clear');

function loadRecords() {
  const saved = JSON.parse(localStorage.getItem('workoutRecords') || '[]');
  records.innerHTML = '';
  if (saved.length === 0) {
    records.innerHTML = '<li class="empty">まだ記録がありません。最初の記録を追加しよう！</li>';
    return;
  }
  saved.forEach(item => {
    const li = document.createElement('li');
    const name = document.createElement('strong');
    const detail = document.createElement('small');
    name.textContent = item.exercise;
    detail.textContent = `${item.weight} kg × ${item.reps} 回`;
    li.append(name, detail);
    records.appendChild(li);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const entry = {
    exercise: document.getElementById('exercise').value.trim(),
    weight: document.getElementById('weight').value,
    reps: document.getElementById('reps').value
  };
  const saved = JSON.parse(localStorage.getItem('workoutRecords') || '[]');
  saved.unshift(entry);
  localStorage.setItem('workoutRecords', JSON.stringify(saved));
  form.reset();
  loadRecords();
});

clearButton.addEventListener('click', () => {
  if (confirm('トレーニング記録をすべて削除しますか？')) {
    localStorage.removeItem('workoutRecords');
    loadRecords();
  }
});

loadRecords();
