/* Main JavaScript for PSE@LSU website */
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Slideshow functionality for welcome section */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}

/* Product slider functionality */
const productTrack = document.querySelector(".product-track");
const productCards = document.querySelectorAll(".product-card");
const productPrev = document.querySelector(".product-prev");
const productNext = document.querySelector(".product-next");
const productDots = document.querySelector(".product-dots");

if (productTrack && productCards.length && productDots) {
  let activeIndex = 0;

  productCards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "product-dot";
    dot.setAttribute("aria-label", `Go to product ${index + 1}`);

    dot.addEventListener("click", () => {
      activeIndex = index;

      productCards[activeIndex].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest"
      });

      updateProductDots();
    });

    productDots.appendChild(dot);
  });

  const dots = productDots.querySelectorAll(".product-dot");

  function updateProductDots() {
    const trackLeft = productTrack.getBoundingClientRect().left;

    let closestIndex = 0;
    let closestDistance = Infinity;

    productCards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndex = closestIndex;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  function scrollToProduct(index) {
    activeIndex = Math.max(0, Math.min(index, productCards.length - 1));

    productCards[activeIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest"
    });

    updateProductDots();
  }

  productPrev?.addEventListener("click", () => {
    scrollToProduct(activeIndex - 1);
  });

  productNext?.addEventListener("click", () => {
    scrollToProduct(activeIndex + 1);
  });

  productTrack.addEventListener("scroll", updateProductDots);
  window.addEventListener("resize", updateProductDots);

  updateProductDots();
}