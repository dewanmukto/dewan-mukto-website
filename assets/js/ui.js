import { initHomepage } from './app.js';
import { createAppCard } from './components.js'; // Add this import

function setupSidebar() {
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
}

function setupModal() {
  const modal = document.getElementById("install-modal");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", () => {
    modal.classList.remove("modal-open");
  });

  document.getElementById("project-container").addEventListener("click", e => {
    if (e.target.closest(".install-button")) {
      const button = e.target.closest(".install-button");
      const sourceLink = document.getElementById("modal-source");
      const visitLink = document.getElementById("modal-visit");
      sourceLink.href = button.dataset.repo || "#";
      visitLink.href = button.dataset.url || "#";
      modal.classList.add("modal-open");
    }
  });
}

function setupSearch(projects) {
  console.log("Setting up search with projects:", projects); // Debug log
  const searchInput = document.getElementById("search");
  if (!searchInput) {
    console.error("Search input element not found");
    return;
  }
  searchInput.addEventListener("input", e => {
    console.log("Search input event triggered, query:", e.target.value); // Debug log
    searchProjects(projects, e.target.value);
  });
}

function searchProjects(projects, query) {
  console.log("searchProjects called with query:", query, "and projects:", projects); // Debug log
  const container = document.getElementById("project-container");
  const modal = document.getElementById("install-modal");
  modal.classList.remove("modal-open");

  if (!query.trim()) {
    console.log("Query is empty, restoring homepage"); // Debug log
    initHomepage(projects);
    return;
  }

  const lower = query.toLowerCase();
  const filtered = projects.filter(p => {
    const searchString = `${p.title || ""}${p.description || ""}${p.repo || ""}${p.url || ""}${p.category || ""}`.toLowerCase();
    console.log(`Checking project: ${p.title}, searchString: ${searchString}, match: ${searchString.includes(lower)}`); // Debug log
    return searchString.includes(lower);
  });

  console.log("Filtered projects:", filtered); // Debug log
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
      ${filtered.map(p => createAppCard(p)).join("")}
    </div>
  `;
}

export { setupSidebar, setupModal, setupSearch };
