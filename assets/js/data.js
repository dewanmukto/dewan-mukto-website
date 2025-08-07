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

export { compliments, getRandomRating, getStarsHTML };
