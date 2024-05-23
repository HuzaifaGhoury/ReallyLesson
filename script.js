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

  let currentIndex = 0;
  let cardsToShow = 1; // Default to 1 card for small screens
  let isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  // Update cardsToShow based on media query
  function updateCardsToShow() {
    isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    cardsToShow = isSmallScreen ? 1 : 3; // Adapt for different screen sizes
  }

  // Event listener for media query changes
  window.addEventListener("resize", updateCardsToShow);
  updateCardsToShow(); // Call initially to set cardsToShow

  // Clone cards for infinite scrolling (not needed for small screens)
  function cloneCards() {
    if (!isSmallScreen) {
      // Only clone if not small screen
      const totalCards = cards.length;
      for (let i = 0; i < cardsToShow; i++) {
        const clonePrev = cards[totalCards - 1 - i].cloneNode(true);
        const cloneNext = cards[i].cloneNode(true);
        wrapper.insertBefore(clonePrev, wrapper.firstChild);
        wrapper.appendChild(cloneNext);
      }
    }
  }

  cloneCards(); // Run cloning initially

  // Update visibility to show the correct number of cards
  function updateVisibility() {
    const allCards = wrapper.children;

    // Remove highlight from all card-bodies
    Array.from(allCards).forEach((card) => {
      card.style.display = "none";
      card.classList.remove("highlight");
    });

    // Show the current card
    if (isSmallScreen) {
      // Show only the current card for small screens
      allCards[currentIndex].style.display = "flex";
      allCards[currentIndex].classList.add("highlight");
      allCards[currentIndex].classList.add("single-card");
    } else {
      // Show cardsToShow cards for larger screens
      for (let i = currentIndex; i < currentIndex + cardsToShow; i++) {
        allCards[i].style.display = "flex";
      }

      // Highlight the middle card's body (if applicable)
      if (currentIndex + 1 < allCards.length) {
        allCards[currentIndex + 1].classList.add("highlight");
      }
    }
  }

  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + wrapper.children.length) % wrapper.children.length;
    if (currentIndex < cardsToShow && !isSmallScreen) {
      // Handle wrapping on larger screens
      currentIndex += cards.length;
    }
    updateVisibility();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % wrapper.children.length;
    if (
      currentIndex >= wrapper.children.length - cardsToShow &&
      !isSmallScreen
    ) {
      // Handle wrapping on larger screens
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

document.addEventListener("DOMContentLoaded", () => {
  // Function to create and trigger animations
  const createAnimation = (elementSelector, animationFn) => {
    const element = document.querySelector(elementSelector);

    if (!element) return;

    // Create a GSAP timeline for the element but pause it initially
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power1.out" },
      paused: true,
    });

    // Apply the animation function to the timeline
    animationFn(tl);

    // Intersection Observer to trigger animations when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.unobserve(entry.target); // Stop observing once animation starts
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
  };

  // Define animations for each section
  const heroAnimations = (tl) => {
    tl.from(
      ".hero-section .hero-text .title",
      { y: 50, opacity: 0, stagger: 0.2 },
      "-=0.5"
    )
      .from(".hero-section .hero-img", { scale: 0.5, opacity: 0 }, "-=0.5")
      .from(".hero-section .hero-para", { y: 50, opacity: 0 }, "-=0.5");
  };

  const packagesAnimations = (tl) => {
    tl.from(".packages-section .title", { y: 50, opacity: 0 }, "-=0.5").from(
      ".packages-section .card",
      { y: 50, opacity: 0, stagger: 0.2 },
      "-=0.5"
    );
  };

  const contactAnimations = (tl) => {
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
      .from(
        ".contact-section .right .form-head",
        { x: 100, opacity: 0 },
        "-=0.5"
      )
      .from(
        ".contact-section .right .form div",
        { y: 50, opacity: 0, stagger: 0.2 },
        "-=0.5"
      )
      .from(".contact-section .right button", { y: 50, opacity: 0 }, "-=0.5");
  };

  // Create animations for each section
  createAnimation(".hero-section", heroAnimations);
  createAnimation(".packages-section", packagesAnimations);
  createAnimation(".contact-section", contactAnimations);
});

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("menu-checkbox");
  const menuLinks = document.querySelectorAll(
    "#menu a, .buttons .cart-btn, .buttons .login-btn"
  );

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      checkbox.checked = false;
    });
  });
});
