const form = document.getElementById("search-form");

form.addEventListener("submit", (e) => e.preventDefault());

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const container = document.getElementById("results-container");
const keywords = [/beach/i, /countr/i, /temple/i];
const jsonMatcher = ["beaches", "countries", "temples"];

container.style.display = "none";

searchButton.addEventListener("click", () => {
  container.innerHTML = "";
  const value = searchInput.value;
  keywords.forEach(async (keyword, index) => {
    if (keyword.test(value)) {
      container.style.display = "block";
      const res = await getRecommendations();
      const recommendations = res[jsonMatcher[index]];
      console.log(recommendations);
      recommendations.forEach((recommendation) => {
        if ("cities" in recommendation) {
          recommendation.cities.forEach((city) => {
            container.innerHTML += `
        <div class="rounded h-[25rem] bg-white">
            <img
              src="${city.imageUrl}"
              alt="iconic location"
              class="w-full h-3/5"
            />
            <div class="p-2 space-y-2">
              <h6>${city.name}</h6>
              <p>
                ${city.description}
              </p>
              <button
                id="search-btn"
                class="text-white px-2 py-1 bg-cyan-700 rounded"
              >
                Visit
              </button>
            </div>
          </div>
      `;
          });
        } else {
          container.innerHTML += `
        <div class="rounded h-[25rem] bg-white">
            <img
              src="${recommendation.imageUrl}"
              alt="iconic location"
              class="w-full h-3/5"
            />
            <div class="p-2 space-y-2">
              <h6>${recommendation.name}</h6>
              <p>
                ${recommendation.description}
              </p>
              <button
                id="search-btn"
                class="text-white px-2 py-1 bg-cyan-700 rounded"
              >
                Visit
              </button>
            </div>
          </div>
      `;
        }
      });
    }
  });
});

clearButton.addEventListener("click", () => {
  container.style.display = "none";
  container.innerHTML = "";
  searchInput.value = "";
});

async function getRecommendations() {
  const jsonData = await fetch("/travel-bloom/travel_recommendation_api.json");
  const data = await jsonData.json();
  return data;
}
