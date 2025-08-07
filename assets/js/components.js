import { compliments, getRandomRating, getStarsHTML } from './data.js';

function createReviewBlock() {
  const review = compliments[Math.floor(Math.random() * compliments.length)];
  const rating = getRandomRating();
  return `
    <div class="flex gap-2 sm:gap-4 py-3 border-t border-gray-200">
      <img src="https://i.pravatar.cc/100?u=${Math.random()}" class="rounded-full w-8 sm:w-10 h-8 sm:h-10">
      <div>
        <div class="text-xs sm:text-sm font-medium text-gray-900">User ${Math.floor(Math.random() * 1000)}</div>
        ${getStarsHTML(rating)}
        <p class="text-xs text-gray-600 mt-1">${review}</p>
      </div>
    </div>
  `;
}

function createAppCard(item, isFeatured = false) {
  return `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md p-3 sm:p-4 transition cursor-pointer group relative" data-id="${item.id || item.title}">
      ${isFeatured ? '<div class="absolute top-2 right-2 bg-[#3DDC84] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"><iconify-icon icon="mdi:star-circle" width="12"></iconify-icon> Featured</div>' : ''}
      <div class="flex items-start gap-2 sm:gap-3">
        <div class="app-icon w-12 sm:w-14 h-12 sm:h-14 bg-gray-100 flex items-center justify-center">
          ${item.icon ? `<img src="${item.icon}" class="w-full h-full object-contain" />` : `<span class="text-lg sm:text-xl font-bold text-gray-600">${item.title[0]}</span>`}
        </div>
        <div class="flex-1">
          <h3 class="text-sm sm:text-base font-medium text-gray-900 truncate">${item.title}</h3>
          <p class="text-xs text-gray-500">Mux</p>
          ${getStarsHTML(getRandomRating())}
          <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <iconify-icon icon="mdi:download" width="12"></iconify-icon>
            <span>${Math.floor(Math.random() * 1000000)} downloads</span>
          </div>
          <span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full mt-1">${item.category}</span>
        </div>
      </div>
      <div class="mt-2 sm:mt-3 flex gap-2">
        <button class="install-button play-button text-white text-xs sm:text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${item.repo}" data-url="${item.url}">
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
  `;
}

function createDetailedAppSection(item) {
  return `
    <section class="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <button id="back-home" class="mb-4 text-xs sm:text-sm text-[#3DDC84] hover:underline flex items-center gap-1">
        <i class="fas fa-arrow-left"></i> Back to Home
      </button>
      <div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div class="app-icon w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 flex items-center justify-center mx-auto sm:mx-0">
          ${item.icon ? `<img src="${item.icon}" class="w-full h-full object-contain" />` : `<span class="text-2xl sm:text-3xl font-bold text-gray-600">${item.title[0]}</span>`}
        </div>
        <div class="flex-1 text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-medium text-gray-900">${item.title}</h3>
          <p class="text-xs sm:text-sm text-gray-500">Mux</p>
          ${getStarsHTML(getRandomRating())}
          <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
            <span class="flex items-center gap-1"><iconify-icon icon="mdi:download" width="12"></iconify-icon> ${Math.floor(Math.random() * 1000000)} downloads</span>
            <span>• Free</span>
            <span>• In-app purchases</span>
            <span class="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">${item.category}</span>
          </div>
        </div>
      </div>
      <div class="mt-3 sm:mt-4 flex gap-2">
        <button class="install-button play-button text-white text-sm sm:text-base font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full flex-1 flex items-center justify-center gap-1" data-repo="${item.repo}" data-url="${item.url}">
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
        <p class="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3">${item.description}</p>
        ${
          item.technologies
            ? `
              <div class="flex flex-wrap gap-2 mt-2">
                ${
                  Array.isArray(item.technologies)
                    ? item.technologies
                        .map(
                          tech =>
                            `<span class="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <iconify-icon icon="mdi:code-tags" width="12"></iconify-icon> ${tech}
                            </span>`
                        )
                        .join("")
                    : `<span class="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <iconify-icon icon="mdi:code-tags" width="12"></iconify-icon> ${item.technologies}
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
}

export { createAppCard, createDetailedAppSection };
