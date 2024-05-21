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
      card.classList.remove("highlight");
    });

    // Show the current set of cards
    for (let i = currentIndex; i < currentIndex + cardsToShow; i++) {
      allCards[i].style.display = "flex";
    }

    // Highlight the middle card's body
    allCards[currentIndex + 1].classList.add("highlight");
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
  const openDetailsButtons = document.querySelectorAll(".open-details");
  const detailsOverlay = document.querySelector(".details-overlay");
  const closeDetailsButton = document.querySelector(".close-details");

  const detailsTitle = document.querySelector(".details-title");
  const detailsDescription = document.querySelector(".details-description");
  const detailsPrice = document.querySelector(".details-price");

  openDetailsButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const title = button.getAttribute("data-title");
      const description = button.getAttribute("data-description");
      const price = button.getAttribute("data-price");

      detailsTitle.textContent = title;
      detailsDescription.textContent = description;
      detailsPrice.textContent = price;

      openDetails();
    });
  });

  closeDetailsButton.addEventListener("click", () => {
    closeDetails();
  });

  detailsOverlay.addEventListener("click", (event) => {
    if (event.target === detailsOverlay) {
      closeDetails();
    }
  });

  function openDetails() {
    detailsOverlay.style.display = "flex";
  }

  function closeDetails() {
    detailsOverlay.style.display = "none";
  }
});

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // GSAP timeline
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power1.out" } });

  // Animate header elements
  tl.from(".header", { y: -100, opacity: 0 })
    .from(".header .left", { x: -100, opacity: 0 }, "-=0.5")
    .from(".header .right", { x: 100, opacity: 0 }, "-=0.5");

  // Animate hero section text and image
  tl.from(
    ".hero-section .hero-text .title",
    { y: 50, opacity: 0, stagger: 0.2 },
    "-=0.5"
  )
    .from(".hero-section .hero-para", { y: 50, opacity: 0 }, "-=0.5")
    .from(".hero-section .hero-img", { scale: 0.5, opacity: 0 }, "-=0.5");

  // Animate packages section title and cards
  tl.from(".packages-section .title", { y: 50, opacity: 0 }, "-=0.5").from(
    ".packages-section .card",
    { y: 50, opacity: 0, stagger: 0.2 },
    "-=0.5"
  );

  // Animate contact section form elements
  tl.from(
    ".contact-section .left .contact-up",
    { x: -100, opacity: 0 },
    "-=0.5"
  )
    .from(
      ".contact-section .left .contact-down",
      { x: -100, opacity: 0 },
      "-=0.5"
    )
    .from(".contact-section .right .form-head", { x: 100, opacity: 0 }, "-=0.5")
    .from(
      ".contact-section .right .form div",
      { y: 50, opacity: 0, stagger: 0.2 },
      "-=0.5"
    )
    .from(".contact-section .right button", { y: 50, opacity: 0 }, "-=0.5");
});
