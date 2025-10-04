AOS.init({ duration:800, once:true });

let eventsContainer = document.getElementById('events-container');
let searchInput = document.getElementById('search');
let filterSelect = document.getElementById('filter');

let modal = document.getElementById('modal');
let closeModal = document.getElementById('close-modal');
let modalName = document.getElementById('modal-name');
let modalCollege = document.getElementById('modal-college');
let modalDate = document.getElementById('modal-date');
let modalType = document.getElementById('modal-type');
let modalDesc = document.getElementById('modal-desc');
let modalLink = document.getElementById('modal-link');

let eventsData = [];

let totalCounter = document.getElementById('total-events');
let workshopsCounter = document.getElementById('workshops');
let hackathonsCounter = document.getElementById('hackathons');
let symposiumsCounter = document.getElementById('symposiums');

function scrollToEvents() {
  document.getElementById('events-container').scrollIntoView({ behavior:'smooth' });
}

// Fetch events
fetch('events.json')
.then(res => res.json())
.then(data => {
  eventsData = data;
  updateCounters(eventsData);
  displayEvents(eventsData);
});

// Display events
function displayEvents(events) {
  eventsContainer.innerHTML = '';
  events.forEach(event => {
    let card = document.createElement('div');
    card.classList.add('event-card', event.type);
    card.setAttribute('data-aos','fade-up');
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>College:</strong> ${event.college}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Type:</strong> ${event.type}</p>
    `;
    card.addEventListener('click', () => openModal(event));
    eventsContainer.appendChild(card);
  });
}

// Modal functions
function openModal(event) {
  modalName.textContent = event.name;
  modalCollege.textContent = event.college;
  modalstart_date.textContent = event.start_date;
  modalstart_end.textContent = event.end_date;
  modalType.textContent = event.type;
  modalDesc.textContent = event.desc || "No description";
  modalLink = document.getElementById('modal-link');
  modalLink.href = event.link || "#";
  modalLink.textContent="visit event page";
  modal.style.display = "block";
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if(e.target==modal) modal.style.display="none"; }

// Search & Filter
searchInput.addEventListener('input', filterEvents);
filterSelect.addEventListener('change', filterEvents);

function filterEvents() {
  let text = searchInput.value.toLowerCase();
  let type = filterSelect.value;
  let filtered = eventsData.filter(e => 
    (e.name.toLowerCase().includes(text) || e.college.toLowerCase().includes(text)) &&
    (type==='all' || e.type===type)
  );
  displayEvents(filtered);
  updateCounters(filtered);
}

// Update counters
function updateCounters(events) {
  totalCounter.textContent = events.length;
  workshopsCounter.textContent = events.filter(e=>e.type==='workshop').length;
  hackathonsCounter.textContent = events.filter(e=>e.type==='hackathon').length;
  symposiumsCounter.textContent = events.filter(e=>e.type==='symposium').length;
}
