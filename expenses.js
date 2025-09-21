const date = document.getElementById('date');
const description = document.getElementById('description');
const category = document.getElementById('category');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('add');
const ul = document.querySelector('ul');
const menuIcon = document.querySelector('.menu-icon');
let menu = true;

menuIcon.addEventListener('click', () => {
  if (!menu) {
    ul.style.visibility = "hidden";
    menu = true;
  } else {
    ul.style.visibility = "visible";
    menu = false;
  }
});

const transactionsBody = document.getElementById('transactionsBody');

let expenses = [];

// Load saved expenses on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('expenses');
  if (saved) {
    expenses = JSON.parse(saved);
    expenses.forEach((expense, index) => addExpensesToTable(expense, index));
  }
});

addBtn.addEventListener('click', () => {
  const expeDate = date.value.trim();
  const expeDescription = description.value.trim();
  const expeCategory = category.value.trim();
  const expeAmount = amount.value.trim();

  if (!expeDate || !expeDescription || !expeCategory || !expeAmount) {
    alert("Please fill in all fields.");
    return;
  }

  const expense = {
    date: expeDate,
    description: expeDescription,
    category: expeCategory,
    amount: parseFloat(expeAmount).toFixed(2)
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Pass index of the new expense
  addExpensesToTable(expense, expenses.length - 1);

  // Clear inputs
  date.value = "";
  description.value = "";
  category.value = "";
  amount.value = "";
});

export function addExpensesToTable(expense, index) {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${expense.date}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
    <td class="negative">-₹${expense.amount}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  // Delete button functionality
  const deleteBtn = row.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    // Remove from array
    expenses.splice(index, 1);
    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // Remove row from DOM
    row.remove();
  });

  transactionsBody.appendChild(row);
}
