import './style.css';

const itemInput = document.getElementById('itemInput');
const quantityInput = document.getElementById('quantityInput');
const addItemForm = document.getElementById('addItemForm');
const itemList = document.getElementById('itemList');

const editModal = document.getElementById('editModal');
const editItemForm = document.getElementById('editItemForm');
const editItemInput = document.getElementById('editItemInput');
const editQuantityInput = document.getElementById('editQuantityInput');
const cancelEdit = document.getElementById('cancelEdit');

let items = JSON.parse(localStorage.getItem('items')) || [];
let editIndex = null;

addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = itemInput.value.trim();
  const quantity = quantityInput.value;
  addItem(item, quantity);
});

editItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveEditItem();
});

cancelEdit.addEventListener("click", () => {
  hideEditModal();
});

function addItem(item, quantity) {
  if (item && quantity > 0) {

    items.push({ name: item, quantity });
    itemInput.value = '';
    quantityInput.value = 1;

   
    localStorage.setItem('items', JSON.stringify(items));

    displayItems();
  }
}

function displayItems() {
  itemList.innerHTML = '';
  items.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border', 'rounded', 'bg-gray-50');
    listItem.innerHTML = `
      <div>
        <h3 class="text-lg font-bold">Item Name: ${item.name}</h3>
        <span class="text-slate-500">Quantity: ${item.quantity}</span>
      </div>
      <div>
        <button class="editButton bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button class="deleteButton bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    `;

    const editButton = listItem.querySelector('.editButton');
    const deleteButton = listItem.querySelector('.deleteButton');

    editButton.addEventListener('click', () => showEditModal(index));
    deleteButton.addEventListener('click', () => deleteItem(index));

    itemList.appendChild(listItem);
  });
}

function showEditModal(index) {
  editIndex = index;
  editItemInput.value = items[index].name;
  editQuantityInput.value = items[index].quantity;
  editModal.classList.remove('hidden');
}

function hideEditModal() {
  editModal.classList.add('hidden');
  editIndex = null;
}

function saveEditItem() {
  const updatedName = editItemInput.value.trim();
  const updatedQuantity = editQuantityInput.value;

  if (updatedName && updatedQuantity > 0) {
  
    items[editIndex].name = updatedName;
    items[editIndex].quantity = updatedQuantity;

   
    localStorage.setItem('items', JSON.stringify(items));
    displayItems();
    hideEditModal();
  }
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  displayItems();
}

window.addEventListener('DOMContentLoaded', () => {
  displayItems();
});
