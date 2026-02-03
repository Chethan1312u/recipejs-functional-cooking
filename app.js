const RecipeApp = (() => {
    console.log("RecipeApp initializing...");

    // ============================================
    // RECIPE DATA
    // ============================================
    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "Creamy Italian pasta.",
            category: "pasta",
            ingredients: [
                "Spaghetti",
                "Eggs",
                "Parmesan cheese",
                "Black pepper",
                "Olive oil"
            ],
            steps: [
                "Boil pasta in salted water",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Beat eggs",
                        "Add grated cheese",
                        "Mix with pepper"
                    ]
                },
                "Drain pasta",
                "Combine pasta and sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Spiced tomato curry.",
            category: "curry",
            ingredients: [
                "Chicken",
                "Yogurt",
                "Tomatoes",
                "Spices",
                "Cream"
            ],
            steps: [
                "Marinate chicken",
                {
                    text: "Cook sauce",
                    substeps: [
                        "Heat oil",
                        "Add spices",
                        {
                            text: "Prepare base",
                            substeps: ["Add tomatoes", "Simmer well"]
                        }
                    ]
                },
                "Grill chicken",
                "Combine chicken and sauce",
                "Serve with rice"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Flaky French pastry.",
            category: "baking",
            ingredients: [
                "Flour",
                "Butter",
                "Yeast",
                "Milk",
                "Sugar"
            ],
            steps: [
                "Prepare dough",
                "Layer butter",
                "Fold and roll dough",
                "Proof croissants",
                "Bake until golden"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh veggie salad.",
            category: "salad",
            ingredients: [
                "Tomatoes",
                "Cucumber",
                "Olives",
                "Feta cheese",
                "Olive oil"
            ],
            steps: [
                "Chop vegetables",
                "Add olives and cheese",
                "Drizzle olive oil",
                "Mix gently",
                "Serve fresh"
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Beef wrapped in pastry.",
            category: "meat",
            ingredients: [
                "Beef fillet",
                "Mushrooms",
                "Puff pastry",
                "Mustard",
                "Egg yolk"
            ],
            steps: [
                "Sear beef",
                "Prepare mushroom duxelles",
                "Wrap beef",
                "Cover with pastry",
                "Bake until perfect"
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Quick veggie stir fry.",
            category: "vegetarian",
            ingredients: [
                "Mixed vegetables",
                "Soy sauce",
                "Garlic",
                "Oil",
                "Pepper"
            ],
            steps: [
                "Heat pan",
                "Add oil and garlic",
                "Add vegetables",
                "Stir fry quickly",
                "Serve hot"
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai noodle dish.",
            category: "noodles",
            ingredients: [
                "Rice noodles",
                "Eggs",
                "Peanuts",
                "Sauce",
                "Vegetables"
            ],
            steps: [
                "Soak noodles",
                "Cook eggs",
                "Add noodles and sauce",
                "Mix vegetables",
                "Garnish and serve"
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic cheese pizza.",
            category: "pizza",
            ingredients: [
                "Pizza dough",
                "Tomato sauce",
                "Mozzarella",
                "Basil",
                "Olive oil"
            ],
            steps: [
                "Prepare dough",
                "Spread sauce",
                "Add cheese",
                "Bake pizza",
                "Garnish with basil"
            ]
        }
    ];

    // ============================================
    // STATE
    // ============================================
    let currentFilter = "all";
    let currentSort = "none";

    // ============================================
    // DOM REFERENCES
    // ============================================
    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortButtons = document.querySelectorAll(".sort-btn");

    // ============================================
    // FILTER & SORT (UNCHANGED)
    // ============================================
    const filterByDifficulty = (recipes, level) =>
        recipes.filter(r => r.difficulty === level);

    const filterByTime = (recipes, maxTime) =>
        recipes.filter(r => r.time < maxTime);

    const applyFilter = (recipes, filterType) => {
        switch (filterType) {
            case "easy":
            case "medium":
            case "hard":
                return filterByDifficulty(recipes, filterType);
            case "quick":
                return filterByTime(recipes, 30);
            default:
                return recipes;
        }
    };

    const sortByName = (recipes) =>
        [...recipes].sort((a, b) => a.title.localeCompare(b.title));

    const sortByTime = (recipes) =>
        [...recipes].sort((a, b) => a.time - b.time);

    const applySort = (recipes, sortType) => {
        switch (sortType) {
            case "name":
                return sortByName(recipes);
            case "time":
                return sortByTime(recipes);
            default:
                return recipes;
        }
    };

    // ============================================
    // RECURSION
    // ============================================
    const renderSteps = (steps, level = 0) => {
        return `
            <ul class="steps level-${level}">
                ${steps.map(step => {
                    if (typeof step === "string") {
                        return `<li>${step}</li>`;
                    }
                    return `
                        <li>
                            ${step.text}
                            ${renderSteps(step.substeps, level + 1)}
                        </li>
                    `;
                }).join("")}
            </ul>
        `;
    };

    const createStepsHTML = (recipe) =>
        `<div class="steps-container">${renderSteps(recipe.steps)}</div>`;

    const createIngredientsHTML = (recipe) => `
        <div class="ingredients-container">
            <ul>
                ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
            </ul>
        </div>
    `;

    // ============================================
    // CARD TEMPLATE
    // ============================================
    const createRecipeCard = (recipe) => `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>

            <div class="card-actions">
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">
                    Show Steps
                </button>
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">
                    Show Ingredients
                </button>
            </div>

            ${createStepsHTML(recipe)}
            ${createIngredientsHTML(recipe)}
        </div>
    `;

    const renderRecipes = (list) => {
        recipeContainer.innerHTML = list.map(createRecipeCard).join("");
    };

    const updateDisplay = () => {
        let result = applyFilter(recipes, currentFilter);
        result = applySort(result, currentSort);
        renderRecipes(result);
    };

    // ============================================
    // EVENT DELEGATION
    // ============================================
    const handleToggleClick = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const btn = e.target;
        const card = btn.closest(".recipe-card");
        const type = btn.dataset.toggle;
        const container = card.querySelector(`.${type}-container`);

        container.classList.toggle("visible");
        btn.textContent = container.classList.contains("visible")
            ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
            : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    };

    const updateActiveButtons = () => {
        filterButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.filter === currentFilter)
        );
        sortButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.sort === currentSort)
        );
    };

    const setupEventListeners = () => {
        filterButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentFilter = e.target.dataset.filter;
                updateActiveButtons();
                updateDisplay();
            })
        );

        sortButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentSort = e.target.dataset.sort;
                updateActiveButtons();
                updateDisplay();
            })
        );

        recipeContainer.addEventListener("click", handleToggleClick);
        console.log("Event listeners attached!");
    };

    const init = () => {
        updateDisplay();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    return { init, updateDisplay };
})();

RecipeApp.init();
