const RecipeApp = (() => {
    console.log("🚀 RecipeApp initializing...");

    /* =======================
       RECIPE DATA
    ======================= */
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "Creamy Italian pasta.",
            category: "pasta",
            ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pepper", "Olive oil"],
            steps: ["Boil pasta", "Prepare sauce", "Mix and serve"]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Spiced tomato curry.",
            category: "curry",
            ingredients: ["Chicken", "Yogurt", "Tomatoes", "Spices"],
            steps: ["Marinate", "Cook sauce", "Combine and serve"]
        },
        {
            id: 3,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh veggie salad.",
            category: "salad",
            ingredients: ["Tomatoes", "Cucumber", "Feta", "Olives"],
            steps: ["Chop veggies", "Mix", "Serve"]
        }
    ];

    /* =======================
       STATE
    ======================= */
    let currentFilter = "all";
    let currentSort = "none";
    let searchQuery = "";
    let debounceTimer;

    let favorites =
        JSON.parse(localStorage.getItem("recipeFavorites")) || [];

    /* =======================
       DOM REFERENCES
    ======================= */
    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortButtons = document.querySelectorAll(".sort-btn");
    const searchInput = document.querySelector("#search-input");
    const clearSearchBtn = document.querySelector("#clear-search");
    const recipeCounter = document.querySelector("#recipe-counter");

    /* =======================
       FILTERS
    ======================= */
    const filterBySearch = (list, query) => {
        if (!query) return list;

        const lowerQuery = query.toLowerCase().trim();

        return list.filter(recipe => {
            const titleMatch = recipe.title
                .toLowerCase()
                .includes(lowerQuery);

            const ingredientMatch = recipe.ingredients.some(i =>
                i.toLowerCase().includes(lowerQuery)
            );

            const descriptionMatch = recipe.description
                .toLowerCase()
                .includes(lowerQuery);

            return titleMatch || ingredientMatch || descriptionMatch;
        });
    };

    const filterFavorites = list =>
        list.filter(r => favorites.includes(r.id));

    const applyFilter = (list, type) => {
        if (type === "favorites") return filterFavorites(list);
        return list;
    };

    /* =======================
       SORTING
    ======================= */
    const applySort = (list, type) => {
        if (type === "name") {
            return [...list].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
        if (type === "time") {
            return [...list].sort((a, b) => a.time - b.time);
        }
        return list;
    };

    /* =======================
       FAVORITES
    ======================= */
    const toggleFavorite = id => {
        if (favorites.includes(id)) {
            favorites = favorites.filter(fid => fid !== id);
        } else {
            favorites.push(id);
        }

        localStorage.setItem(
            "recipeFavorites",
            JSON.stringify(favorites)
        );

        updateDisplay();
    };

    /* =======================
       UI HELPERS
    ======================= */
    const updateCounter = (shown, total) => {
        recipeCounter.textContent = `Showing ${shown} of ${total} recipes`;
    };

    /* =======================
       CARD TEMPLATE
    ======================= */
    const createRecipeCard = recipe => `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>

            <div class="recipe-meta">
                <span>⏱ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>

                <button
                    class="favorite-btn ${
                        favorites.includes(recipe.id) ? "active" : ""
                    }"
                    data-id="${recipe.id}"
                >
                    ❤️
                </button>
            </div>

            <p>${recipe.description}</p>
        </div>
    `;

    const renderRecipes = list => {
        recipeContainer.innerHTML = list
            .map(createRecipeCard)
            .join("");
    };

    /* =======================
       MAIN FLOW
    ======================= */
    const updateDisplay = () => {
        let result = filterBySearch(recipes, searchQuery);
        result = applyFilter(result, currentFilter);
        result = applySort(result, currentSort);

        updateCounter(result.length, recipes.length);
        renderRecipes(result);
    };

    /* =======================
       EVENTS
    ======================= */
    const handleSearch = e => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            searchQuery = e.target.value;
            clearSearchBtn.style.display = searchQuery
                ? "inline"
                : "none";
            updateDisplay();
        }, 300);
    };

    const clearSearch = () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.style.display = "none";
        updateDisplay();
    };

    const handleFavoriteClick = e => {
        if (!e.target.classList.contains("favorite-btn")) return;
        toggleFavorite(Number(e.target.dataset.id));
    };

    const setupEventListeners = () => {
        filterButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentFilter = e.target.dataset.filter;
                updateDisplay();
            })
        );

        sortButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentSort = e.target.dataset.sort;
                updateDisplay();
            })
        );

        searchInput.addEventListener("input", handleSearch);
        clearSearchBtn.addEventListener("click", clearSearch);
        recipeContainer.addEventListener("click", handleFavoriteClick);
    };

    const init = () => {
        console.log("✅ RecipeApp ready");
        updateDisplay();
        setupEventListeners();
    };

    return { init };
})();

RecipeApp.init();
