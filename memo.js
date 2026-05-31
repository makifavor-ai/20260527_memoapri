const dinners = [
  { name: 'タイの塩昆布和え', emoji: '🐟', ingredients: ['タイの刺身', '塩昆布', 'ごま油', '大葉'] },
  { name: 'サーモンとごまの和え物', emoji: '🐠', ingredients: ['サーモンの刺身', '白ごま', '醤油', 'みりん', '大葉'] },
  { name: 'とろたく', emoji: '🍣', ingredients: ['マグロのトロ', 'たくあん', '刻み海苔', '醤油'] }
];

const today = dinners[new Date().getDay() % dinners.length];
document.getElementById('dinner-emoji').textContent = today.emoji;
document.getElementById('dinner-name').textContent = today.name;

const di = document.getElementById('dinner-ingredients');
di.innerHTML = '<p class="ingredients-label">必要な食材</p>' + today.ingredients.map(i => `<p class="ingredient-item">・${i}</p>`).join('');

let items = JSON.parse(localStorage.getItem('shopping_items') || '[]');
const list = document.getElementById('shopping-list');
const emptyMsg = document.getElementById('empty-msg');

function renderList() {
  list.querySelectorAll('li:not(.empty)').forEach(e => e.remove());
  if (items.length === 0) {
    emptyMsg.style.display = '';
  } else {
    emptyMsg.style.display = 'none';
    items.forEach((item, i) => {
      const li = document.createElement('li');
      if (item.checked) li.classList.add('checked');
      li.innerHTML = `<input type="checkbox" ${item.checked ? 'checked' : ''}><span>${item.text}</span>`;
      li.querySelector('input').addEventListener('change', function() {
        items[i].checked = this.checked;
        li.classList.toggle('checked', this.checked);
        localStorage.setItem('shopping_items', JSON.stringify(items));
      });
      list.appendChild(li);
    });
  }
}

renderList();

document.getElementById('add-btn').addEventListener('click', function() {
  const val = document.getElementById('item-input').value.trim();
  if (!val) return;
  items.push({ text: val, checked: false });
  localStorage.setItem('shopping_items', JSON.stringify(items));
  document.getElementById('item-input').value = '';
  renderList();
});

document.getElementById('item-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') document.getElementById('add-btn').click();
});

document.getElementById('clear-btn').addEventListener('click', function() {
  items = [];
  localStorage.setItem('shopping_items', JSON.stringify(items));
  renderList();
});