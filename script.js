document.addEventListener("scroll", function () {
  var sections = document.querySelectorAll(".section");
  var navbarLinks = document.querySelectorAll("#navbar a");
  var container = document.querySelector(".container");

  sections.forEach(function (section) {
    var bounding = section.getBoundingClientRect();
    var currentSection = null;

    if (
      bounding.top >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      currentSection = section.id;
    }

    navbarLinks.forEach(function (link) {
      link.classList.remove("active-link");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active-link");
      }
    });
  });

  var scrollTop = window.scrollY || document.documentElement.scrollTop;
  var docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrollPercent = (scrollTop / docHeight) * 100;

  container.style.setProperty("--scroll-percent", scrollPercent + "%");

  container.style.setProperty("--scroll-width", scrollPercent + "%");
});

const style = document.createElement("style");
style.textContent = `
  .container::after {
    width: var(--scroll-width);
  }
`;
document.head.append(style);

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".package-wrapper");
  const cards = Array.from(wrapper.children);
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const cardsToShow = 3; // Number of cards to show at a time
  let currentIndex = 0;

  // Clone cards to handle infinite scrolling
  function cloneCards() {
    const totalCards = cards.length;
    for (let i = 0; i < cardsToShow; i++) {
      const clonePrev = cards[totalCards - 1 - i].cloneNode(true);
      const cloneNext = cards[i].cloneNode(true);
      wrapper.insertBefore(clonePrev, wrapper.firstChild);
      wrapper.appendChild(cloneNext);
    }
  }

  cloneCards();

  // Update visibility to show exactly 3 cards
  function updateVisibility() {
    const allCards = wrapper.children;

    // Remove highlight from all card-bodies
    Array.from(allCards).forEach((card) => {
      card.style.display = "none";
      card.querySelector(".card-body").classList.remove("highlight");
    });

    // Show the current set of cards
    for (let i = currentIndex; i < currentIndex + cardsToShow; i++) {
      allCards[i].style.display = "flex";
    }

    // Highlight the middle card's body
    allCards[currentIndex + 1]
      .querySelector(".card-body")
      .classList.add("highlight");
  }

  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + wrapper.children.length) % wrapper.children.length;
    if (currentIndex < cardsToShow) {
      currentIndex += cards.length;
    }
    updateVisibility();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % wrapper.children.length;
    if (currentIndex >= wrapper.children.length - cardsToShow) {
      currentIndex -= cards.length;
    }
    updateVisibility();
  });

  updateVisibility(); // Initial call to set the correct visibility
});

document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.querySelectorAll(
    "button[data-modal-target]"
  );
  const closeModalButton = document.querySelector(".close-modal");
  const modalOverlay = document.querySelector(".modal-overlay");

  openModalButton.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  closeModalButton.addEventListener("click", () => {
    const modal = closeModalButton.closest(".modal");
    closeModal(modal);
  });

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      const modal = document.querySelector(".modal.open");
      closeModal(modal);
    }
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("open");
    modalOverlay.classList.add("open");
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("open");
    modalOverlay.classList.remove("open");
  }
});
