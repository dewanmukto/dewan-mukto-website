import { createAppCard, createDetailedAppSection } from './components.js';
import { setupSidebar, setupModal, setupSearch } from './ui.js';

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
        <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-full flex items-center gap-1" data-repo="${featured.repo}" data-url="${featured.url}">
          <iconify-icon icon="mdi:play" width="16"></iconify-icon> Explore
        </button>
      </section>
    `;
  }

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
        ${projects.slice(0, 6).map(p => createAppCard(p, true)).join("")}
      </div>
    </section>
  `;

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
        ${projects.slice(0, 6).map(p => createAppCard(p)).join("")}
      </div>
    </section>
  `;

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
        ${projects.slice(6, 12).map(p => createAppCard(p)).join("")}
      </div>
    </section>
  `;

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
        ${projects.slice(12, 18).map(p => createAppCard(p)).join("")}
      </div>
    </section>
  `;

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
            ${categoryProjects.map(p => createAppCard(p)).join("")}
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
            ${filtered.map(p => createAppCard(p)).join("")}
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
            ${filtered.map(p => createAppCard(p)).join("")}
          </div>
        `;
      }
    });
  });

  document.getElementById("project-container").addEventListener("click", e => {
    const card = e.target.closest("[data-id]");
    if (card && !e.target.closest(".install-button")) {
      const project = projects.find(p => (p.id || p.title) === card.dataset.id);
      if (project) {
        document.getElementById("project-container").innerHTML = createDetailedAppSection(project);
        const modal = document.getElementById("install-modal");
        modal.classList.remove("modal-open");
      }
    }
  });

  document.getElementById("home-button")?.addEventListener("click", () => {
    initHomepage(projects);
  });

  document.getElementById("back-home")?.addEventListener("click", () => {
    initHomepage(projects);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("install-modal");
  modal.classList.remove("modal-open");

  fetch("data/projects.json")
    .then(res => res.json())
    .then(data => {
      initProjects(data);
      setupSidebar();
      setupModal();
      setupSearch(data);
    })
    .catch(err => {
      console.error("Error fetching projects:", err);
      document.getElementById("project-container").innerHTML = '<p class="text-center text-gray-500">Failed to load projects.</p>';
    });
});

export { initHomepage, initProjects };
