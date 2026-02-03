// ============================================
// RECIPE DATA
// ============================================
const recipes = [
    { id: 1, title: "Classic Spaghetti Carbonara", time: 25, difficulty: "easy", description: "Creamy Italian pasta.", category: "pasta" },
    { id: 2, title: "Chicken Tikka Masala", time: 45, difficulty: "medium", description: "Spiced tomato curry.", category: "curry" },
    { id: 3, title: "Homemade Croissants", time: 180, difficulty: "hard", description: "Flaky French pastry.", category: "baking" },
    { id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh veggie salad.", category: "salad" },
    { id: 5, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Beef wrapped in pastry.", category: "meat" },
    { id: 6, title: "Vegetable Stir Fry", time: 20, difficulty: "easy", description: "Quick veggie stir fry.", category: "vegetarian" },
    { id: 7, title: "Pad Thai", time: 30, difficulty: "medium", description: "Thai noodle dish.", category: "noodles" },
    { id: 8, title: "Margherita Pizza", time: 60, difficulty: "medium", description: "Classic cheese pizza.", category: "pizza" }
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
// FILTER FUNCTIONS (PURE)
// ============================================
const filterByDifficulty = (recipes, level) =>
    recipes.filter(recipe => recipe.difficulty === level);

const filterByTime = (recipes, maxTime) =>
    recipes.filter(recipe => recipe.time < maxTime);

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

// ============================================
// SORT FUNCTIONS (PURE)
// ============================================
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
// RENDER FUNCTIONS
// ============================================
const createRecipeCard = (recipe) => `
    <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join("");
};

// ============================================
// UPDATE DISPLAY
// ============================================
const updateDisplay = () => {
    let result = recipes;
    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);

    console.log(`Showing ${result.length} recipes | Filter: ${currentFilter}, Sort: ${currentSort}`);
    renderRecipes(result);
};

// ============================================
// ACTIVE BUTTON STATE
// ============================================
const updateActiveButtons = () => {
    filterButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.filter === currentFilter)
    );
    sortButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.sort === currentSort)
    );
};

// ============================================
// EVENT HANDLERS
// ============================================
const handleFilterClick = (e) => {
    currentFilter = e.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
};

const handleSortClick = (e) => {
    currentSort = e.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
};

// ============================================
// SETUP
// ============================================
const setupEventListeners = () => {
    filterButtons.forEach(btn =>
        btn.addEventListener("click", handleFilterClick)
    );
    sortButtons.forEach(btn =>
        btn.addEventListener("click", handleSortClick)
    );
};

// ============================================
// INITIALIZE
// ============================================
updateDisplay();
setupEventListeners();
