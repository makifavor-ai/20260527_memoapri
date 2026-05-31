document.addEventListener('DOMContentLoaded', function() {

const breakfasts = [
  { name: 'たまごかけごはん・みそ汁', emoji: '🍳🍜', ingredients: ['卵', '米', '味噌', 'わかめ', '豆腐'] },
  { name: 'トースト・目玉焼き', emoji: '🍞🍳', ingredients: ['食パン', '卵', 'バター', '塩'] }
];

const dinners = [
  { name: 'タイの塩昆布和え', emoji: '🐟', ingredients: ['タイの刺身', '塩昆布', 'ごま油', '大葉'] },
  { name: 'サーモンとごまの和え物', emoji: '🐠', ingredients: ['サーモンの刺身', '白ごま', '醤油', 'みりん', '大葉'] },
  { name: 'とろたく', emoji: '🍣', ingredients: ['マグロのトロ', 'たくあん', '刻み海苔', '醤油'] }
];

const bi = document.getElementById('breakfast-ingredients');
const di = document.getElementById('dinner-ingredients');

function showBreakfastButtons() {
  document.getElementById('breakfast-emoji').textContent = '';
  document.getElementById('breakfast-name').textContent = '';
  bi.innerHTML = breakfasts.map((b, i) =>
    `<button onclick="selectBreakfast(${i})" style="display:block; width:100%; text-align:left; margin:4px 0; padding:6px 10px; border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer;">
      ${b.emoji} ${b.name}
    </button>`
  ).join('');
}

function showDinnerButtons() {
  document.getElementById('dinner-emoji').textContent = '';
  document.getElementById('dinner-name').textContent = '';
  di.innerHTML = dinners.map((d, i) =>
    `<button onclick="selectDinner(${i})" style="display:block; width:100%; text-align:left; margin:4px 0; padding:6px 10px; border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer;">
      ${d.emoji} ${d.name}
    </button>`
  ).join('');
}

showBreakfastButtons();
showDinnerButtons();

window.selectBreakfast = function(i) {
  const b = breakfasts[i];
  document.getElementById('breakfast-emoji').textContent = b.emoji;
  document.getElementById('breakfast-name').textContent = b.name;
  bi.innerHTML = '<p class="ingredients-label">必要な食材</p>'
    + b.ingredients.map(ing => `<p class="ingredient-item">・${ing}</p>`).join('')
    + `<button onclick="showBreakfastButtons()" style="margin-top:10px; padding:4px 12px; font-size:12px; border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer;">選び直す</button>`;
};

window.selectDinner = function(i) {
  const d = dinners[i];
  document.getElementById('dinner-emoji').textContent = d.emoji;
  document.getElementById('dinner-name').textContent = d.name;
  di.innerHTML = '<p class="ingredients-label">必要な食材</p>'
    + d.ingredients.map(ing => `<p class="ingredient-item">・${ing}</p>`).join('')
    + `<button onclick="showDinnerButtons()" style="margin-top:10px; padding:4px 12px; font-size:12px; border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer;">選び直す</button>`;
};

window.showBreakfastButtons = showBreakfastButtons;
window.showDinnerButtons = showDinnerButtons;

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

});