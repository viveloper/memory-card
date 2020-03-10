// DOM
const cardsContainer = document.getElementById('cards-container');
const navigation = document.getElementById('navigation');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// State
const state = {
  cards: getCards(),
  activeCardIndex: 0
};

// Get card from local storage
function getCards() {
  const cards = localStorage.getItem('cards')
    ? JSON.parse(localStorage.getItem('cards'))
    : [];
  return cards;
}

function init() {
  // Update UI
  updateCardsContainer();
  updateNavigation();

  // Bind Events
  nextBtn.addEventListener('click', () => {
    if (state.activeCardIndex + 1 < state.cards.length) {
      state.activeCardIndex++;
      updateCard();
      updateNavigation();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (state.activeCardIndex - 1 >= 0) {
      state.activeCardIndex--;
      updateCard();
      updateNavigation();
    }
  });

  showBtn.addEventListener('click', showAddContainer);

  hideBtn.addEventListener('click', hideAddContainer);

  addCardBtn.addEventListener('click', submitNewCard);

  clearBtn.addEventListener('click', clearCards);
}

init();

function updateCardsContainer() {
  cardsContainer.innerHTML = '';
  if (state.cards.length > 0) {
    state.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');

      if (index === state.activeCardIndex) {
        cardEl.className = 'card active';
      } else if (index < state.activeCardIndex) {
        cardEl.className = 'card left';
      } else {
        cardEl.className = 'card';
      }

      cardEl.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${card.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${card.answer}
            </p>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => flipCard(index));

      cardsContainer.appendChild(cardEl);
    });
  } else {
    const emptyCardHTML = `
      <div class="card active" onclick="showAddContainer()">
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              <span><i class="fas fa-plus"></i></span> Add New Card
            </p>
          </div>        
      </div>
    `;
    cardsContainer.innerHTML = emptyCardHTML;
  }
}

function updateCard() {
  const cardsEl = cardsContainer.querySelectorAll('.card');
  cardsEl.forEach((cardEl, index) => {
    if (index === state.activeCardIndex) {
      cardEl.className = 'card active';
    } else if (index < state.activeCardIndex) {
      cardEl.className = 'card left';
    } else {
      cardEl.className = 'card';
    }
  });
}

function updateNavigation() {
  if (state.cards.length > 0) {
    navigation.style.display = 'flex';
    currentEl.innerText = `${state.activeCardIndex + 1}/${state.cards.length}`;
  } else {
    navigation.style.display = 'none';
    currentEl.innerText = '';
  }
}

function flipCard(index) {
  const cardsEl = cardsContainer.querySelectorAll('.card');
  cardsEl[index].classList.toggle('show-answer');
}

function showAddContainer() {
  addContainer.classList.add('show');
}

function hideAddContainer() {
  addContainer.classList.remove('show');
}

function submitNewCard() {
  const newCard = {
    question: questionEl.value,
    answer: answerEl.value
  };

  state.cards.push(newCard);
  state.activeCardIndex = state.cards.length - 1;

  updateCardsContainer();
  updateNavigation();

  storeDataToLocalStorage();

  hideAddContainer();
  clearAddCard();
}

function clearAddCard() {
  questionEl.value = '';
  answerEl.value = '';
}

function storeDataToLocalStorage() {
  localStorage.setItem('cards', JSON.stringify(state.cards));
}

function clearCards() {
  if (window.confirm('Remove all cards?')) {
    state.cards = [];
    state.activeCardIndex = 0;
    storeDataToLocalStorage();

    updateCardsContainer();
    updateNavigation();
  }
}
