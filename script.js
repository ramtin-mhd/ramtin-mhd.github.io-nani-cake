// Loading Screen Animation
document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  const container = document.querySelector(".container");

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");
    container.classList.add("loaded");

    // Remove loading screen after animation
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2500);
});

// Enhanced Menu Filtering
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const menuGrid = document.querySelector(".menu-grid");
  const specialOfferBox = document.getElementById("special-offer-box");
  const mainContent = document.querySelector(".main-content");
  const filterScroll = document.querySelector(".filter-scroll");
  const leftIndicator = document.querySelector(".scroll-indicator.left");
  const rightIndicator = document.querySelector(".scroll-indicator.right");

  // Initialize scroll indicators
  function updateScrollIndicators() {
    if (!filterScroll) return;

    const isAtStart = filterScroll.scrollLeft <= 5;
    const isAtEnd =
      filterScroll.scrollLeft + filterScroll.clientWidth >=
      filterScroll.scrollWidth - 5;

    if (leftIndicator) {
      leftIndicator.classList.toggle("visible", !isAtStart);
    }
    if (rightIndicator) {
      rightIndicator.classList.toggle("visible", !isAtEnd);
    }
  }

  // Scroll functionality
  if (leftIndicator) {
    leftIndicator.addEventListener("click", () => {
      filterScroll.scrollBy({ left: -150, behavior: "smooth" });
    });
  }

  if (rightIndicator) {
    rightIndicator.addEventListener("click", () => {
      filterScroll.scrollBy({ left: 150, behavior: "smooth" });
    });
  }

  // Update indicators on scroll
  if (filterScroll) {
    filterScroll.addEventListener("scroll", updateScrollIndicators);
    // Initial check
    updateScrollIndicators();
  }

  // Touch/swipe support for mobile
  let isScrolling = false;
  let startX = 0;
  let scrollLeft = 0;

  if (filterScroll) {
    filterScroll.addEventListener("touchstart", (e) => {
      isScrolling = true;
      startX = e.touches[0].pageX - filterScroll.offsetLeft;
      scrollLeft = filterScroll.scrollLeft;
    });

    filterScroll.addEventListener("touchmove", (e) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - filterScroll.offsetLeft;
      const walk = (x - startX) * 2;
      filterScroll.scrollLeft = scrollLeft - walk;
    });

    filterScroll.addEventListener("touchend", () => {
      isScrolling = false;
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Show/hide special offer box
      if (specialOfferBox) {
        if (category === "all" || category === "special-offer") {
          specialOfferBox.style.display = "block";
        } else {
          specialOfferBox.style.display = "none";
        }
      }

      // Update active button with animation
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.style.transform = "scale(1)";
      });
      this.classList.add("active");
      this.style.transform = "scale(1.05)";

      // Add loading effect to menu grid
      menuGrid.style.opacity = "0.7";
      menuGrid.style.transform = "scale(0.98)";

      // Filter menu items with improved animation
      let visibleItems = 0;
      menuItems.forEach((item, index) => {
        const itemCategory = item.getAttribute("data-category");

        if (category === "all" || itemCategory === category) {
          // Show item with staggered animation
          setTimeout(() => {
            item.style.display = "block";
            item.classList.remove("hidden");
            item.style.opacity = "0";
            item.style.transform = "translateY(30px) scale(0.9)";

            // Animate item in
            setTimeout(() => {
              item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
              item.style.opacity = "1";
              item.style.transform = "translateY(0) scale(1)";
            }, 50);
          }, visibleItems * 100);

          visibleItems++;
        } else {
          // Hide item with animation
          item.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
          item.style.opacity = "0";
          item.style.transform = "translateY(-20px) scale(0.8)";

          setTimeout(() => {
            item.classList.add("hidden");
            item.style.display = "none";
          }, 400);
        }
      });

      // Restore menu grid after filtering
      setTimeout(() => {
        menuGrid.style.opacity = "1";
        menuGrid.style.transform = "scale(1)";
        // Instantly scroll to top of main content after filtering, offset for header
        if (mainContent) {
          mainContent.scrollIntoView({ behavior: "auto", block: "start" });
          const header = document.querySelector(".header");
          if (header) {
            const headerHeight = header.offsetHeight;
            window.scrollBy({ top: -headerHeight, left: 0, behavior: "auto" });
          }
        }
      }, visibleItems * 100 + 200);

      // Add visual feedback for selected category
      const categoryNames = {
        all: "همه",
        coffee: "قهوه",
        "hot-drinks": "نوشیدنی‌های گرم",
        "cold-drinks": "نوشیدنی‌های سرد",
        cookies: "کلوچه‌های تازه",
        "bento-cake": "کیک‌های بنتو",
        mochi: "موچی",
        "special-offer": "پیشنهاد ویژه",
      };

      // Show category title animation
      showCategoryTitle(categoryNames[category] || "موارد منو");
    });
  });
});

// Function to show category title with animation
function showCategoryTitle(title) {
  // Remove existing title if any
  const existingTitle = document.querySelector(".category-title");
  if (existingTitle) {
    existingTitle.remove();
  }

  // Create new title
  const titleElement = document.createElement("div");
  titleElement.className = "category-title";
  titleElement.textContent = title;
  titleElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    background: linear-gradient(135deg, #ff69b4, #ff8da1);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    z-index: 1000;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
  `;

  document.body.appendChild(titleElement);

  // Animate in
  setTimeout(() => {
    titleElement.style.opacity = "1";
    titleElement.style.transform = "translate(-50%, -50%) scale(1)";
  }, 100);

  // Animate out
  setTimeout(() => {
    titleElement.style.opacity = "0";
    titleElement.style.transform = "translate(-50%, -50%) scale(0.8)";
    setTimeout(() => {
      titleElement.remove();
    }, 500);
  }, 1500);
}

// Add hover effects and interactions
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    // Add click effect
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "translateY(-8px)";
      }, 150);
    });

    // Add mouse enter effect
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    // Add mouse leave effect
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Smooth scroll for navigation
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Smooth scroll to menu section
      const menuSection = document.querySelector(".main-content");
      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});

// Add parallax effect to header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const scrolled = window.pageYOffset;

  if (scrolled > 100) {
    header.style.background =
      "linear-gradient(135deg, rgba(255,105,180,0.95) 0%, rgba(255,141,161,0.95) 100%)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #ff69b4 0%, #ff8da1 100%)";
    header.style.backdropFilter = "none";
  }
});

// Add floating animation to coffee icons
document.addEventListener("DOMContentLoaded", function () {
  const coffeeIcons = document.querySelectorAll(".fas.fa-coffee");

  coffeeIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
  });
});

// Add confetti effect on page load
function createConfetti() {
  const confettiCount = 50;
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "9998";

  document.body.appendChild(confettiContainer);

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.background = ["#ff69b4", "#ff8da1", "#ffb6c1", "#ffeef8"][
      Math.floor(Math.random() * 4)
    ];
    confetti.style.borderRadius = "50%";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.animation = `confettiFall ${
      Math.random() * 3 + 2
    }s linear forwards`;
    confetti.style.animationDelay = Math.random() * 2 + "s";

    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 5000);
}

// Add confetti animation to CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trigger confetti after loading screen
setTimeout(() => {
  createConfetti();
}, 3000);

// Add typing effect to cafe name
document.addEventListener("DOMContentLoaded", function () {
  const cafeName = document.querySelector(".cafe-logo h1");
  const originalText = cafeName.textContent;
  cafeName.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < originalText.length) {
      cafeName.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  setTimeout(typeWriter, 500);
});

// Add pulse effect to prices
document.addEventListener("DOMContentLoaded", function () {
  const prices = document.querySelectorAll(".price");

  prices.forEach((price) => {
    price.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 0.6s ease-in-out";
    });

    price.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });
});

// Add pulse animation to CSS
const pulseStyle = document.createElement("style");
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);
