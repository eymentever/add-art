// Addart - Main Script with Selection Logic

let selectedServices = [];

// Header scroll effect
const header = document.querySelector('#header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Selection Drawer Logic
const selectionBtn = document.querySelector('#selection-btn');
const drawer = document.querySelector('#selection-drawer');
const overlay = document.querySelector('#drawer-overlay');
const closeDrawer = document.querySelector('#close-drawer');
const cartCount = document.querySelector('#cart-count');
const selectedList = document.querySelector('#selected-items-list');

const toggleDrawer = (open) => {
  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

selectionBtn.addEventListener('click', () => toggleDrawer(true));
closeDrawer.addEventListener('click', () => toggleDrawer(false));
overlay.addEventListener('click', () => toggleDrawer(false));

// Add to Quote Logic
document.querySelectorAll('.add-to-quote').forEach(button => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    if (!selectedServices.includes(service)) {
      selectedServices.push(service);
      updateUI();
      toggleDrawer(true);
    }
  });
});

function updateUI() {
  cartCount.textContent = selectedServices.length;
  selectedList.innerHTML = '';
  
  selectedServices.forEach(service => {
    const item = document.createElement('div');
    item.className = 'selected-item';
    item.innerHTML = `
      <span>${service}</span>
      <button onclick="removeService('${service}')">Kaldır</button>
    `;
    selectedList.appendChild(item);
  });
}

window.removeService = (service) => {
  selectedServices = selectedServices.filter(s => s !== service);
  updateUI();
};

// WhatsApp Integration
const whatsappBtn = document.querySelector('#whatsapp-request');
whatsappBtn.addEventListener('click', () => {
  if (selectedServices.length === 0) {
    alert('Lütfen en az bir hizmet seçin.');
    return;
  }
  
  const phoneNumber = '905330377707';
  const message = `Merhaba Addart, web sitenizden şu hizmetler için bilgi almak istiyorum:\n\n- ${selectedServices.join('\n- ')}\n\nDetaylı fiyat ve süreç hakkında dönüş yapabilir misiniz?`;
  
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});

// Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.category-card, .art-card, .section-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  observer.observe(el);
});

console.log('Addart Interactive Demo Ready');
