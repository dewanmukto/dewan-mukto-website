// assets/js/scripts.js
const compliments = [
  "Really impressive!", "Great user experience.", "Smooth performance.", "Fantastic design!",
  "Very intuitive.", "Highly recommend!", "Clean and modern.", "Super useful app.",
  "Top-notch quality!", "Love the features!", "Well executed.", "Perfect for my needs."
];

function getRandomRating() {
  const ratings = [3, 3.5, 4, 4.5, 5];
  return ratings[Math.floor(Math.random() * ratings.length)];
}

function getStarsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return `
    <div class="flex items-center text-yellow-400">
      ${'<i class="fas fa-star text-xs sm:text-sm"></i>'.repeat(full)}
      ${'<i class="fas fa-star-half-alt text-xs sm:text-sm"></i>'.repeat(half)}
      ${'<i class="far fa-star text-xs sm:text-sm"></i>'.repeat(empty)}
      <span class="ml-1 text-xs text-gray-600">${rating.toFixed(1)}</span>
    </div>
  `;
}

function initHomepage(projects) {
  const container = document.getElementById("project-container");
  container.innerHTML = "";
  const modal = document.getElementById("install-modal");
  modal.classList.remove("modal-open");

  if (projects.length > 0) {
    const featured = projects[Math.floor(Math.random() * Math.min(projects.length, 6))];
    container.innerHTML += `
      <section class="mt-4 sm:mt-6 bg-white rounded-xl shadow-sm p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
        <div class="app-icon w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 flex items-center justify-center">
          ${featured.icon ? `<img src="${featured.icon}" class="w-full h-full object-contain" />` : `<span class="text-xl sm:text-2xl font-bold text-gray-600">${featured.title[0]}</span>`}
        </div>
        <div class="flex-1">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 truncate">${featured.title}</h3>
          <p class="text-xs sm:text-sm text-gray-500">Featured Project</p>
          <div class="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
            <div class="h-full bg-[#3DDC84] animate-pulse" style="width: 60%"></div>
          </div>
        </div>
        <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-full flex items-center gap-1" data-repo="${featured.repo || '#'}" data-url="${featured.url || '#'}">
          <iconify-icon icon="mdi:play" width="16"></iconify-icon> Explore
        </button>
      </section>
    `;
  }

  // Trending Section
  container.innerHTML += `
    <section class="mt-4 sm:mt-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
          <iconify-icon icon="mdi:fire" width="20"></iconify-icon> Trending
        </h2>
        <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
          <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
        </button>
      </div>
      <div class="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
        ${projects.slice(0, 6).map(p => `
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
            <div class="absolute top-2 right-2 bg-[#3DDC84] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <iconify-icon icon="mdi:star-circle" width="12"></iconify-icon> Featured
            </div>
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
              </div>
              <div class="flex-1">
                <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                <p class="text-xs text-gray-500">Mux</p>
                ${getStarsHTML(getRandomRating())}
                <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                  <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                </div>
                <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
              </div>
            </div>
            <div class="mt-2 sm:mt-3 flex gap-2">
              <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // Recommended Section
  container.innerHTML += `
    <section class="mt-4 sm:mt-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
          <iconify-icon icon="mdi:thumb-up" width="20"></iconify-icon> Recommended for you
        </h2>
        <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
          <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
        ${projects.slice(0, 6).map(p => `
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
              </div>
              <div class="flex-1">
                <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                <p class="text-xs text-gray-500">Mux</p>
                ${getStarsHTML(getRandomRating())}
                <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                  <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                </div>
                <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
              </div>
            </div>
            <div class="mt-2 sm:mt-3 flex gap-2">
              <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // Top Charts
  container.innerHTML += `
    <section class="mt-4 sm:mt-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
          <iconify-icon icon="mdi:chart-line" width="20"></iconify-icon> Top projects
        </h2>
        <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
          <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
        ${projects.slice(6, 12).map(p => `
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
              </div>
              <div class="flex-1">
                <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                <p class="text-xs text-gray-500">Mux</p>
                ${getStarsHTML(getRandomRating())}
                <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                  <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                </div>
                <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
              </div>
            </div>
            <div class="mt-2 sm:mt-3 flex gap-2">
              <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // New & Updated
  container.innerHTML += `
    <section class="mt-4 sm:mt-6">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
          <iconify-icon icon="mdi:new-box" width="20"></iconify-icon> New & updated
        </h2>
        <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
          <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
        ${projects.slice(12, 18).map(p => `
          <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
            <div class="flex items-start gap-2 sm:gap-3">
              <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
              </div>
              <div class="flex-1">
                <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                <p class="text-xs text-gray-500">Mux</p>
                ${getStarsHTML(getRandomRating())}
                <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                  <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                </div>
                <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
              </div>
            </div>
            <div class="mt-2 sm:mt-3 flex gap-2">
              <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
              </button>
              <button class="text-gray-500 group relative">
                <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  // Category Sections
  const categories = [...new Set(projects.map(p => p.category))];
  categories.forEach(category => {
    const categoryProjects = projects.filter(p => p.category === category).slice(0, 6);
    if (categoryProjects.length > 0) {
      container.innerHTML += `
        <section class="mt-4 sm:mt-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
              <iconify-icon icon="mdi:folder" width="20"></iconify-icon> ${category}
            </h2>
            <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
              <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            ${categoryProjects.map(p => `
              <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                    ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                    <p class="text-xs text-gray-500">Mux</p>
                    ${getStarsHTML(getRandomRating())}
                    <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                      <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                    </div>
                    <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
                  </div>
                </div>
                <div class="mt-2 sm:mt-3 flex gap-2">
                  <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                    <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        </section>
      `;
    }
  });
}

function initProjects(projects) {
  const tabContainer = document.querySelector(".tab-container");
  const categories = ["all", "top", "new", ...new Set(projects.map(p => p.category))];
  tabContainer.innerHTML = categories.map(cat => `
    <button class="tab py-2 px-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-[#018786] whitespace-nowrap ${cat === "all" ? "tab-active" : ""}" data-category="${cat}">
      <iconify-icon icon="mdi:${cat === "all" ? "home" : cat === "top" ? "chart-line" : cat === "new" ? "new-box" : "folder"}" width="16" class="inline"></iconify-icon>
      ${cat === "all" ? "For you" : cat === "top" ? "Top charts" : cat === "new" ? "New" : cat}
    </button>
  `).join("");

  initHomepage(projects);

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");
      const category = tab.dataset.category;
      const container = document.getElementById("project-container");
      container.innerHTML = "";
      const modal = document.getElementById("install-modal");
      modal.classList.remove("modal-open");
      if (category === "all") {
        initHomepage(projects);
      } else if (category === "top" || category === "new") {
        const filtered = projects.slice(category === "top" ? 0 : 6, category === "top" ? 6 : 12);
        container.innerHTML = `
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
              <iconify-icon icon="mdi:${category === "top" ? "chart-line" : "new-box"}" width="20"></iconify-icon>
              ${category === "top" ? "Top projects" : "New & updated"}
            </h2>
            <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
              <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            ${filtered.map(p => `
              <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                    ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                    <p class="text-xs text-gray-500">Mux</p>
                    ${getStarsHTML(getRandomRating())}
                    <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                      <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                    </div>
                    <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
                  </div>
                </div>
                <div class="mt-2 sm:mt-3 flex gap-2">
                  <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                    <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      } else {
        const filtered = projects.filter(p => p.category === category);
        container.innerHTML = `
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
              <iconify-icon icon="mdi:folder" width="20"></iconify-icon> ${category}
            </h2>
            <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
              <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            ${filtered.map(p => `
              <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
                <div class="flex items-start gap-2 sm:gap-3">
                  <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
                    ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
                    <p class="text-xs text-gray-500">Mux</p>
                    ${getStarsHTML(getRandomRating())}
                    <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                      <span>${Math.floor(Math.random() * 1000000)} downloads</span>
                    </div>
                    <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
                  </div>
                </div>
                <div class="mt-2 sm:mt-3 flex gap-2">
                  <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
                    <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
                  </button>
                  <button class="text-gray-500 group relative">
                    <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
                    <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `;
      }
    });
  });

  document.getElementById("project-container").addEventListener("click", e => {
    const card = e.target.closest("[data-id]");
    if (card && !e.target.closest(".install-button")) {
      const id = card.dataset.id;
      // Redirect to post page if it's a post (handled by Jekyll's permalink)
      if (id.startsWith("/")) {
        window.location.href = id;
      } else {
        // Handle project click (client-side rendering for now)
        const project = projects.find(p => (p.id || p.title) === id);
        if (project) {
          const container = document.getElementById("project-container");
          container.innerHTML = `
            <section class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <button id="back-home" class="mb-4 text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
                <i class="fas fa-arrow-left"></i> Back to Home
              </button>
              <div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div class="app-icon w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 flex items-center justify-center mx-auto sm:mx-0">
                  ${project.icon ? `<img src="${project.icon}" class="w-full h-full object-contain" />` : `<span class="text-2xl sm:text-3xl font-bold text-gray-600">${project.title[0]}</span>`}
                </div>
                <div class="flex-1 text-center sm:text-left">
                  <h3 class="text-base sm:text-lg font-medium text-gray-900">${project.title}</h3>
                  <p class="text-xs sm:text-sm text-gray-500">Mux</p>
                  ${getStarsHTML(getRandomRating())}
                  <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                    <span class="flex items-center gap-1"><iconify-icon icon="mdi:download" width="12"></iconify-icon> ${Math.floor(Math.random() * 1000000)} downloads</span>
                    <span>• Free</span>
                    <span>• In-app purchases</span>
                    <span class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">${project.category}</span>
                  </div>
                </div>
              </div>
              <div class="mt-3 sm:mt-4 flex gap-2">
                <button class="install-button play-button text-white text-sm sm:text-base font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${project.repo || '#'}" data-url="${project.url || '#'}">
                  <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
                </button>
                <button class="border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-full flex items-center justify-center gap-1 group">
                  <iconify-icon icon="mdi:heart-outline" width="16"></iconify-icon> Wishlist
                  <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Add to Wishlist</span>
                </button>
                <button class="border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-full flex items-center justify-center gap-1 group">
                  <iconify-icon icon="mdi:share-variant" width="16"></iconify-icon> Share
                  <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share Project</span>
                </button>
              </div>
              <div class="mt-4 sm:mt-6">
                <h4 class="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                  <iconify-icon icon="mdi:information-outline" width="16"></iconify-icon> About this app
                </h4>
                <p class="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">${project.description}</p>
                ${
                  project.technologies
                    ? `
                      <div class="flex flex-wrap gap-2 mt-2">
                        ${
                          Array.isArray(project.technologies)
                            ? project.technologies
                                .map(
                                  tech =>
                                    `<span class="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <iconify-icon icon="mdi:code-tags" width="12"></iconify-icon> ${tech}
                                    </span>`
                                )
                                .join("")
                            : `<span class="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <iconify-icon icon="mdi:code-tags" width="12"></iconify-icon> ${project.technologies}
                              </span>`
                        }
                      </div>
                    `
                    : ""
                }
                <a href="#" class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1 mt-2">
                  <iconify-icon icon="mdi:chevron-down" width="16"></iconify-icon> Read more
                </a>
              </div>
              <div class="mt-4 sm:mt-6">
                <h4 class="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                  <iconify-icon icon="mdi:image-multiple" width="16"></iconify-icon> Screenshots
                </h4>
                <div class="flex gap-2 sm:gap-3 mt-2 overflow-x-auto scrollbar-hide">
                  <img src="https://picsum.photos/200/400?random=${Math.random()}" class="w-24 sm:w-32 rounded-md">
                  <img src="https://picsum.photos/200/400?random=${Math.random()}" class="w-24 sm:w-32 rounded-md">
                  <img src="https://picsum.photos/200/400?random=${Math.random()}" class="w-24 sm:w-32 rounded-md">
                </div>
              </div>
              <div class="mt-4 sm:mt-6">
                <h4 class="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                  <iconify-icon icon="mdi:star" width="16"></iconify-icon> Ratings & Reviews
                </h4>
                <div class="flex items-center gap-3 sm:gap-4 mt-2">
                  <div class="text-2xl sm:text-3xl font-medium">${getRandomRating().toFixed(1)}</div>
                  ${getStarsHTML(getRandomRating())}
                  <div class="text-xs text-gray-500">${Math.floor(Math.random() * 10000)} reviews</div>
                </div>
                <div class="mt-4">
                  ${Array(3).fill().map(() => createReviewBlock()).join("")}
                </div>
                <button class="mt-4 text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
                  <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> See all reviews
                </button>
              </div>
            </section>
          `;
          modal.classList.remove("modal-open");
        }
      }
    }
  });

  document.getElementById("project-container").addEventListener("click", e => {
    if (e.target.closest(".install-button")) {
      const button = e.target.closest(".install-button");
      const modal = document.getElementById("install-modal");
      const sourceLink = document.getElementById("modal-source");
      const visitLink = document.getElementById("modal-visit");
      sourceLink.href = button.dataset.repo || "#";
      visitLink.href = button.dataset.url || "#";
      modal.classList.add("modal-open");
    }
  });

  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("install-modal").classList.remove("modal-open");
  });

  document.getElementById("back-home")?.addEventListener("click", () => {
    initHomepage(projects);
  });

  document.getElementById("home-button")?.addEventListener("click", () => {
    window.location.href = "{{ '/' | relative_url }}";
  });
}

function searchProjects(projects, query) {
  const container = document.getElementById("project-container");
  const modal = document.getElementById("install-modal");
  modal.classList.remove("modal-open");
  if (!query.trim()) {
    initHomepage(projects);
    return;
  }
  const lower = query.toLowerCase();
  const filtered = projects.filter(p =>
    (p.title + (p.description || "") + (p.repo || "") + (p.url || "") + p.category).toLowerCase().includes(lower)
  );
  container.innerHTML = `
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-lg sm:text-xl font-medium text-gray-900 flex items-center gap-2">
        <iconify-icon icon="mdi:search-web" width="20"></iconify-icon> Search results
      </h2>
      <button class="text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
        <iconify-icon icon="mdi:chevron-right" width="16"></iconify-icon> More
      </button>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
      ${filtered.map(p => `
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${p.id || p.title}">
          <div class="flex items-start gap-2 sm:gap-3">
            <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
              ${p.icon ? `<img src="${p.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${p.title[0]}</span>`}
            </div>
            <div class="flex-1">
              <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${p.title}</h3>
              <p class="text-xs text-gray-500">Mux</p>
              ${getStarsHTML(getRandomRating())}
              <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <iconify-icon icon="mdi:download" width="12"></iconify-icon>
                <span>${Math.floor(Math.random() * 1000000)} downloads</span>
              </div>
              <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${p.category}</span>
            </div>
          </div>
          <div class="mt-2 sm:mt-3 flex gap-2">
            <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${p.repo || '#'}" data-url="${p.url || '#'}">
              <iconify-icon icon="mdi:download" width="16"></iconify-icon> Install
            </button>
            <button class="text-gray-500 group relative">
              <iconify-icon icon="mdi:share-variant" width="16" sm:width="20"></iconify-icon>
              <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Share</span>
            </button>
            <button class="text-gray-500 group relative">
              <iconify-icon icon="mdi:heart-outline" width="16" sm:width="20"></iconify-icon>
              <span class="tooltip absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0">Wishlist</span>
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const openSidebar = document.getElementById("open-sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const closeSidebarAlt = document.getElementById("close-sidebar-alt");

openSidebar.addEventListener("click", () => {
  sidebar.classList.add("sidebar-open");
  sidebarOverlay.classList.remove("hidden");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-open");
  sidebarOverlay.classList.add("hidden");
});

closeSidebarAlt.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-open");
  sidebarOverlay.classList.add("hidden");
});

sidebarOverlay.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-open");
  sidebarOverlay.classList.add("hidden");
});

// Ensure modal is hidden on page load
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("install-modal");
  modal.classList.remove("modal-open");

   // Star rating generation
  document.querySelectorAll(".stars-container").forEach(container => {
    const rating = parseFloat(container.dataset.rating);
    const full = Math.floor(rating);
    const decimal = rating - full;
    const half = decimal >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    
    let starsHTML = "";
    for (let i = 0; i < full; i++) {
      starsHTML += '<i class="fas fa-star text-xs sm:text-sm"></i>';
    }
    for (let i = 0; i < half; i++) {
      starsHTML += '<i class="fas fa-star-half-alt text-xs sm:text-sm"></i>';
    }
    for (let i = 0; i < empty; i++) {
      starsHTML += '<i class="far fa-star text-xs sm:text-sm"></i>';
    }
    container.innerHTML = starsHTML + container.innerHTML; // Prepend stars before rating text
  });

  // Fetch projects and initialize
  fetch("{{ '/_data/projects.json' | relative_url }}")
    .then(res => res.json())
    .then(data => {
      projects = data; // Store globally for search
      initProjects(data);
      document.getElementById("search").addEventListener("input", e => {
        searchProjects(data, e.target.value);
      });
    })
    .catch(err => {
      console.error("Error fetching projects:", err);
      document.getElementById("project-container").innerHTML = '<p class="text-center text-gray-500">Failed to load projects.</p>';
    });
});
