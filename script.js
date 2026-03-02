// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, quantity = 1) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  showNotification(`${name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  
  cartCount.textContent = cart.length;
  
  let total = 0;
  cartItemsDiv.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      cartItemsDiv.innerHTML += `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });
  }
  
  cartTotal.textContent = total;
  updateOrderSummary();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  sidebar.classList.toggle('active');
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  let message = 'Hello! I\'d like to place an order:%0A%0A';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `${item.name} x ${item.quantity} - ₹${itemTotal}%0A`;
    total += itemTotal;
  });
  
  message += `%0ATotal: ₹${total}`;
  
  window.open(`https://wa.me/919999999999?text=${message}`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInReverse 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// Order Functionality
function increaseQty(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
  updateOrderSummary();
}

function decreaseQty(id) {
  const input = document.getElementById(id);
  if (input.value > 0) {
    input.value = parseInt(input.value) - 1;
  }
  updateOrderSummary();
}

function updateOrderSummary() {
  const cap = parseInt(document.getElementById('cap').value) || 0;
  const burger = parseInt(document.getElementById('burger').value) || 0;
  const fries = parseInt(document.getElementById('fries').value) || 0;
  const coldcoffee = parseInt(document.getElementById('coldcoffee').value) || 0;
  
  const total = (cap * 120) + (burger * 150) + (fries * 90) + (coldcoffee * 140);
  const items = cap + burger + fries + coldcoffee;
  
  document.getElementById('total-items').textContent = items;
  document.getElementById('total-price').textContent = total;
}

function orderNow() {
  const cap = document.getElementById('cap').value;
  const burger = document.getElementById('burger').value;
  const fries = document.getElementById('fries').value;
  const coldcoffee = document.getElementById('coldcoffee').value;
  
  if (cap == 0 && burger == 0 && fries == 0 && coldcoffee == 0) {
    alert('Please select at least one item!');
    return;
  }
  
  let msg = "Hello! I'd like to order:%0A";
  
  if (cap > 0) msg += "Cappuccino x " + cap + "%0A";
  if (burger > 0) msg += "Burger x " + burger + "%0A";
  if (fries > 0) msg += "Fries x " + fries + "%0A";
  if (coldcoffee > 0) msg += "Cold Coffee x " + coldcoffee + "%0A";
  
  window.open("https://wa.me/919999999999?text=" + msg);
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeBtn = document.querySelector('.theme-toggle i');
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.classList.remove('fa-moon');
    themeBtn.classList.add('fa-sun');
  } else {
    themeBtn.classList.remove('fa-sun');
    themeBtn.classList.add('fa-moon');
  }
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
  updateThemeIcon();
}

// Menu Filtering
function filterMenu(category) {
  const menuCards = document.querySelectorAll('.menu-card');
  const tabs = document.querySelectorAll('.menu-tab');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  menuCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeInUp 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// Newsletter Subscription
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value;
  
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address!');
    return;
  }
  
  alert('Thank you for subscribing! Check your email for exclusive offers.');
  document.getElementById('newsletter-email').value = '';
}

// Contact Form
function sendMessage() {
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const phone = document.getElementById('contact-phone').value;
  const message = document.getElementById('contact-message').value;
  
  if (!name || !email || !phone || !message) {
    alert('Please fill in all fields!');
    return;
  }
  
  alert('Thank you for your message! We will get back to you soon.');
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-phone').value = '';
  document.getElementById('contact-message').value = '';
}

// Animated Counter
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Initialize counters on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('stat-number')) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.stat-number').forEach(el => {
  observer.observe(el);
});

// Set first menu tab as active
document.addEventListener('DOMContentLoaded', () => {
  const firstTab = document.querySelector('.menu-tab');
  if (firstTab) {
    firstTab.classList.add('active');
  }
  updateCart();
});