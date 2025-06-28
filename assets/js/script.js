"use strict";

// DOM Elements Cache
const DOM = {
  sidebar: document.querySelector("[data-sidebar]"),
  sidebarBtn: document.querySelector("[data-sidebar-btn]"),
  testimonialsItems: document.querySelectorAll("[data-testimonials-item]"),
  modalContainer: document.querySelector("[data-modal-container]"),
  modalCloseBtn: document.querySelector("[data-modal-close-btn]"),
  overlay: document.querySelector("[data-overlay]"),
  modalImg: document.querySelector("[data-modal-img]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalText: document.querySelector("[data-modal-text]"),
  select: document.querySelector("[data-select]"),
  selectItems: document.querySelectorAll("[data-select-item]"),
  selectValue: document.querySelector("[data-selecct-value]"),
  filterBtns: document.querySelectorAll("[data-filter-btn]"),
  filterItems: document.querySelectorAll("[data-filter-item]"),
  form: document.querySelector("[data-form]"),
  formInputs: document.querySelectorAll("[data-form-input]"),
  formBtn: document.querySelector("[data-form-btn]"),
  navigationLinks: document.querySelectorAll("[data-nav-link]"),
  pages: document.querySelectorAll("[data-page]"),
  blogList: document.querySelector(".blog-posts-list"),
  fullBlogContainer: document.getElementById("full-blog-container"),
  fullBlogArticle: document.getElementById("full-blog-article"),
};

// Utility Functions
const utils = {
  toggleElement: (elem) => elem.classList.toggle("active"),
  debounce: (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  },
};

// Sidebar Handler
const sidebarHandler = () => {
  DOM.sidebarBtn.addEventListener("click", () =>
    utils.toggleElement(DOM.sidebar)
  );
};

// Testimonials Modal Handler
// Testimonials Modal Handler
const testimonialsHandler = () => {
  const openModal = () => {
    DOM.modalContainer.classList.add("active");
    DOM.overlay.classList.add("active");
  };

  const closeModal = () => {
    DOM.modalContainer.classList.remove("active");
    DOM.overlay.classList.remove("active");
  };

  DOM.testimonialsItems.forEach((item) => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      DOM.modalImg.src = avatar.src;
      DOM.modalImg.alt = avatar.alt;
      DOM.modalTitle.innerHTML = title.innerHTML;
      DOM.modalText.innerHTML = text.innerHTML;

      openModal();
    });
  });

  DOM.modalCloseBtn.addEventListener("click", closeModal);

  DOM.overlay.addEventListener("click", closeModal);
};

// Filter Handler
const filterHandler = () => {
  const filterFunc = (selectedValue) => {
    DOM.filterItems.forEach((item) => {
      item.classList.toggle(
        "active",
        selectedValue === "all" || selectedValue === item.dataset.category
      );
    });
  };

  DOM.select.addEventListener("click", () => utils.toggleElement(DOM.select));

  DOM.selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      DOM.selectValue.innerText = this.innerText;
      utils.toggleElement(DOM.select);
      filterFunc(selectedValue);
    });
  });

  let lastClickedBtn = DOM.filterBtns[0];
  DOM.filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      DOM.selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
};

// Form Handler
const formHandler = () => {
  const responseMsg = document.createElement("div");
  responseMsg.id = "form-response";
  DOM.form?.appendChild(responseMsg);

  const validateForm = utils.debounce(() => {
    DOM.formBtn.toggleAttribute("disabled", !DOM.form.checkValidity());
  }, 300);

  DOM.formInputs.forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  DOM.form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const buttonText = DOM.formBtn.querySelector("span");
    const originalText = buttonText.textContent;
    buttonText.textContent = "Sending...";
    DOM.formBtn.disabled = true;

    try {
      const response = await fetch(DOM.form.action, {
        method: "POST",
        body: new FormData(DOM.form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        responseMsg.textContent = "✅ Message sent successfully!";
        responseMsg.style.color = "var(--success-color)";
        DOM.form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      responseMsg.textContent = "❌ Failed to send. Please try again.";
      responseMsg.style.color = "var(--error-color)";
      console.error("Form error:", error);
    } finally {
      buttonText.textContent = originalText;
      DOM.formBtn.disabled = false;
      setTimeout(() => (responseMsg.textContent = ""), 5000);
    }
  });
};

// Navigation Handler
const navigationHandler = () => {
  DOM.navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetPage = this.innerHTML.toLowerCase();

      DOM.pages.forEach((page) => {
        const isActive = targetPage === page.dataset.page;
        page.classList.toggle("active", isActive);

        if (isActive) {
          window.scrollTo(0, 0);
          // Lazy load content when page becomes active
          if (targetPage === "blog") blogHandler.loadBlogPosts();
        }
      });

      DOM.navigationLinks.forEach((navLink) => {
        navLink.classList.toggle("active", navLink === this);
      });
    });
  });
};

// Location Handler
const locationHandler = {
  init(options) {
    this.mapContainer = document.getElementById(options.mapContainerId);
    this.locationInput = document.getElementById(options.locationInputId);
    this.coordinatesInput = document.getElementById(options.coordinatesInputId);
    this.detectButton = document.getElementById(options.detectButtonId);

    this.initMap();
    this.setupEventListeners();
  },

  async initMap() {
    try {
      if (this.map) this.map.remove();

      this.map = L.map(this.mapContainer).setView([31.467, 74.3039], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(this.map);

      this.marker = L.marker([31.467, 74.3039], { draggable: true })
        .addTo(this.map)
        .on("dragend", (e) => {
          const pos = e.target.getLatLng();
          this.updateFromMap(pos.lat, pos.lng);
        });

      this.map.on("click", (e) =>
        this.updateFromMap(e.latlng.lat, e.latlng.lng)
      );
      document.getElementById("map-loading").style.display = "none";
    } catch (error) {
      console.error("Map initialization failed:", error);
      this.mapContainer.innerHTML =
        '<p class="map-error">Map failed to load</p>';
    }
  },

  setupEventListeners() {
    this.locationInput.addEventListener(
      "input",
      utils.debounce(() => {
        if (this.locationInput.value.trim()) {
          this.geocodeAddress(this.locationInput.value);
        }
      }, 800)
    );

    this.detectButton.addEventListener("click", () =>
      this.getCurrentLocation()
    );
  },

  async geocodeAddress(address) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data?.[0]) {
        const { lat, lon } = data[0];
        this.updateLocation(parseFloat(lat), parseFloat(lon), address);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  },

  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.locationInput.placeholder = "Geolocation not supported";
      return;
    }

    this.detectButton.innerHTML =
      '<ion-icon name="compass-outline"></ion-icon>';

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: lng } = position.coords;
      await this.updateFromMap(lat, lng);
      this.detectButton.innerHTML =
        '<ion-icon name="checkmark-outline"></ion-icon>';
    } catch (error) {
      this.locationInput.placeholder = "Location access denied";
      this.detectButton.innerHTML =
        '<ion-icon name="close-outline"></ion-icon>';
      setTimeout(() => {
        this.detectButton.innerHTML =
          '<ion-icon name="locate-outline"></ion-icon>';
      }, 2000);
    }
  },

  async updateFromMap(lat, lng) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      this.updateLocation(
        lat,
        lng,
        data.display_name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      );
    } catch (error) {
      this.updateLocation(
        lat,
        lng,
        `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      );
    }
  },

  updateLocation(lat, lng, address) {
    this.coordinatesInput.value = `${lat},${lng}`;
    this.locationInput.value = address;

    if (this.map) {
      this.map.setView([lat, lng], 15);
      this.marker.setLatLng([lat, lng]);
    }
  },
};

// Blog Handler
const blogHandler = {
  posts: [
    "clean-architecture",
    "developer-acceleration",
    "developer-business-dev",
    "from-python-to-production",
    "medisense-accuracy",
    "top-10-se-topics",
    "automating-testing-pipeline",
    "ai-integration",
  ],

  async loadBlogPosts() {
    if (!DOM.blogList || DOM.blogList.children.length > 0) return;

    try {
      const loadingFragments = this.posts.map((post) =>
        this.loadBlogPostFragment(post)
      );

      const fragments = await Promise.all(loadingFragments);
      fragments.forEach((fragment) => {
        if (fragment) DOM.blogList.appendChild(fragment);
      });

      this.setupBlogClickHandlers();
    } catch (error) {
      console.error("Error loading blog posts:", error);
    }
  },

  async loadBlogPostFragment(postId) {
    try {
      const response = await fetch(`./assets/blogs/${postId}.html`);
      if (!response.ok) throw new Error("Failed to load blog post");

      const html = await response.text();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const blogContent = tempDiv.querySelector(".blog-content");
      const blogBanner = tempDiv.querySelector(".blog-banner-box img");

      if (!blogContent || !blogBanner) return null;

      const li = document.createElement("li");
      li.className = "blog-post-item";
      li.innerHTML = `
        <a href="#${postId}" class="blog-post-link" data-blog-id="${postId}">
          <figure class="blog-banner-box">
            <img src="${blogBanner.src}" alt="${blogBanner.alt}" loading="lazy">
          </figure>
          ${blogContent.outerHTML}
        </a>
      `;

      return li;
    } catch (error) {
      console.error(`Error loading blog post ${postId}:`, error);
      return null;
    }
  },

  setupBlogClickHandlers() {
    DOM.blogList?.addEventListener("click", async (e) => {
      const blogLink = e.target.closest(".blog-post-link");
      if (!blogLink) return;

      e.preventDefault();
      const blogId = blogLink.dataset.blogId;

      try {
        const response = await fetch(`./assets/blogs/${blogId}.html`);
        if (!response.ok) throw new Error("Failed to load full blog post");

        const html = await response.text();
        DOM.fullBlogArticle.innerHTML = html;
        DOM.fullBlogContainer.classList.remove("full-blog-hidden");

        // Setup close button
        const closeBtn = document.getElementById("close-blog-btn");
        if (closeBtn) {
          closeBtn.onclick = () => {
            DOM.fullBlogContainer.classList.add("full-blog-hidden");
          };
        }
      } catch (error) {
        console.error("Error loading full blog post:", error);
        DOM.fullBlogArticle.innerHTML = `
          <div class="error-message">
            <p>Failed to load blog post. Please try again later.</p>
          </div>
        `;
        DOM.fullBlogContainer.classList.remove("full-blog-hidden");
      }
    });
  },
};

// Initialize all handlers
document.addEventListener("DOMContentLoaded", () => {
  sidebarHandler();
  testimonialsHandler();
  filterHandler();
  formHandler();
  navigationHandler();

  // Lazy load location handler when contact page is visible
  const contactObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        locationHandler.init({
          mapContainerId: "map-container",
          locationInputId: "manual-location",
          coordinatesInputId: "user-coordinates",
          detectButtonId: "detect-location-btn",
        });
        contactObserver.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  const contactPage = document.querySelector('[data-page="contact"]');
  if (contactPage) contactObserver.observe(contactPage);
});
