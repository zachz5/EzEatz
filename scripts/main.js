// Dorm Chef - Main JavaScript file

// Analytics tracking
const analytics = {
  clicks: 0,
  timeSpent: 0,
  groceryDownloads: 0,
  startTime: Date.now()
};

// 10 Dorm-friendly recipes
const recipes = [
  {
    id: 1,
    name: 'Microwave Mac & Cheese',
    description: 'Creamy mac and cheese made in just 5 minutes',
    cost: 1.50,
    time: 5,
    equipment: 'microwave',
    ingredients: ['1 cup pasta', '1/2 cup milk', '1/2 cup cheese', 'salt', 'pepper'],
    instructions: 'Mix pasta, milk, cheese in microwave-safe bowl. Microwave 3-4 min, stir, serve.',
    image: '🧀',
    category: 'Comfort Food'
  },
  {
    id: 2,
    name: 'Ramen Upgrade',
    description: 'Elevate instant ramen with egg and vegetables',
    cost: 2.00,
    time: 8,
    equipment: 'kettle',
    ingredients: ['1 pack ramen', '1 egg', '1/4 cup frozen veggies', 'soy sauce', 'sesame oil'],
    instructions: 'Boil water, add ramen and veggies. Crack egg in last 2 minutes. Add seasonings.',
    image: '🍜',
    category: 'Quick Meals'
  },
  {
    id: 3,
    name: 'Microwave Scrambled Eggs',
    description: 'Fluffy scrambled eggs in 2 minutes',
    cost: 0.75,
    time: 2,
    equipment: 'microwave',
    ingredients: ['2 eggs', '2 tbsp milk', 'salt', 'pepper', 'butter'],
    instructions: 'Beat eggs with milk, microwave 30 sec, stir, repeat until set.',
    image: '🍳',
    category: 'Breakfast'
  },
  {
    id: 4,
    name: 'Hot Plate Pasta',
    description: 'Simple pasta with garlic and olive oil',
    cost: 1.25,
    time: 12,
    equipment: 'hotplate',
    ingredients: ['1 cup pasta', '2 cloves garlic', '2 tbsp olive oil', 'red pepper flakes', 'parmesan'],
    instructions: 'Boil pasta. Heat oil, add garlic, toss with pasta. Top with cheese.',
    image: '🍝',
    category: 'Italian'
  },
  {
    id: 5,
    name: 'Microwave Baked Potato',
    description: 'Perfect baked potato with your choice of toppings',
    cost: 1.00,
    time: 8,
    equipment: 'microwave',
    ingredients: ['1 large potato', 'butter', 'sour cream', 'cheese', 'chives'],
    instructions: 'Poke holes in potato, microwave 6-8 min. Split, add toppings.',
    image: '🥔',
    category: 'Comfort Food'
  },
  {
    id: 6,
    name: 'Kettle Oatmeal',
    description: 'Hearty oatmeal with fruit and nuts',
    cost: 1.50,
    time: 5,
    equipment: 'kettle',
    ingredients: ['1/2 cup oats', '1 cup water', 'banana', 'nuts', 'honey'],
    instructions: 'Boil water, add oats, cook 3 min. Top with fruit, nuts, honey.',
    image: '🥣',
    category: 'Breakfast'
  },
  {
    id: 7,
    name: 'Hot Plate Stir Fry',
    description: 'Quick vegetable stir fry with rice',
    cost: 2.50,
    time: 15,
    equipment: 'hotplate',
    ingredients: ['1 cup rice', 'mixed vegetables', 'soy sauce', 'garlic', 'oil'],
    instructions: 'Cook rice. Heat oil, add veggies, stir-fry 5 min. Add sauce, serve over rice.',
    image: '🥬',
    category: 'Asian'
  },
  {
    id: 8,
    name: 'Microwave Quesadilla',
    description: 'Cheesy quesadilla with minimal effort',
    cost: 1.75,
    time: 3,
    equipment: 'microwave',
    ingredients: ['2 tortillas', '1/2 cup cheese', 'salsa', 'sour cream'],
    instructions: 'Layer cheese between tortillas, microwave 1 min. Add salsa and sour cream.',
    image: '🌮',
    category: 'Mexican'
  },
  {
    id: 9,
    name: 'Kettle Soup',
    description: 'Instant soup with added vegetables',
    cost: 1.25,
    time: 6,
    equipment: 'kettle',
    ingredients: ['1 can soup', 'frozen vegetables', 'crackers', 'herbs'],
    instructions: 'Heat soup with vegetables in kettle. Season, serve with crackers.',
    image: '🍲',
    category: 'Soups'
  },
  {
    id: 10,
    name: 'Hot Plate Grilled Cheese',
    description: 'Classic grilled cheese sandwich',
    cost: 1.50,
    time: 8,
    equipment: 'hotplate',
    ingredients: ['2 slices bread', '2 slices cheese', 'butter', 'tomato'],
    instructions: 'Butter bread, add cheese and tomato. Cook in pan 3-4 min per side.',
    image: '🥪',
    category: 'Comfort Food'
  }
];

// Meal plans
const mealPlans = [
  {
    id: 1,
    name: 'Budget Week',
    totalCost: 12.50,
    recipes: [1, 3, 5, 8, 9],
    description: '5 meals under $15 total'
  },
  {
    id: 2,
    name: 'Quick & Easy',
    totalCost: 18.75,
    recipes: [2, 3, 6, 8, 10],
    description: '5 meals ready in under 10 minutes each'
  },
  {
    id: 3,
    name: 'Microwave Master',
    totalCost: 15.00,
    recipes: [1, 3, 5, 8, 9],
    description: '5 meals using only a microwave'
  }
];

// DOM elements
const recipeContainer = document.getElementById('recipeItems');
const mealPlanContainer = document.getElementById('mealPlanItems');
const groceryListContainer = document.getElementById('groceryList');
const totalCostElement = document.getElementById('totalCost');
const downloadBtn = document.getElementById('downloadGroceryList');
const browseRecipesBtn = document.getElementById('browseRecipesBtn');
const mealPlanBtn = document.getElementById('mealPlanBtn');

// Grocery list state
let groceryList = [];
let totalCost = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  renderApp();
  trackTimeSpent();
  console.log('Dorm Chef app initialized! 🍳');
});

// Render the entire app
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;
  
  app.innerHTML = `
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
          <img src="../140-1405828_ncaa-football-top-25-2012-alabama-football-logo.png" alt="Alabama Logo" class="me-2" style="height: 2rem; width: auto;">
          EzEats
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active fw-semibold px-3 py-2 rounded" href="#home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold px-3 py-2 rounded" href="#recipes">Recipes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold px-3 py-2 rounded" href="#meal-plans">Meal Plans</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-semibold px-3 py-2 rounded" href="#grocery">Grocery List</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section py-5 position-relative overflow-hidden">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="mb-4">
              <span class="badge bg-light text-dark hero-badge mb-3">
                <i class="bi bi-star-fill me-1" style="color: #ffc107;"></i>Student Approved
              </span>
            </div>
            <h1 class="display-3 fw-bold mb-4 hero-title">
              Cook Like a Pro in Your Dorm with <span class="text-decoration-underline">EzEats</span>
            </h1>
            <p class="lead mb-4 fs-5 hero-subtitle">
              Affordable, easy recipes designed for dorm life. Save money, eat healthy, 
              and master cooking with just a microwave, hot plate, or kettle.
            </p>
            <div class="d-flex flex-wrap gap-3 mb-4 hero-buttons">
              <button class="btn btn-primary btn-lg px-4 py-3" id="browseRecipesBtn">
                <i class="bi bi-book me-2"></i>Browse Recipes
              </button>
              <button class="btn btn-outline-primary btn-lg px-4 py-3" id="mealPlanBtn">
                <i class="bi bi-calendar-week me-2"></i>Meal Planning
              </button>
            </div>
            <div class="d-flex align-items-center gap-4 text-muted hero-features">
              <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                <small>Budget-Friendly</small>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                <small>Quick & Easy</small>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-building me-2" style="color: var(--ua-crimson);"></i>
                <small>Dorm-Friendly</small>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="text-center position-relative">
              <div class="position-relative d-inline-block">
                <img src="../140-1405828_ncaa-football-top-25-2012-alabama-football-logo.png" alt="Alabama Logo" class="hero-icon" style="height: 8rem; width: auto; border-radius: 50%; object-fit: cover;">
                <div class="position-absolute top-0 start-0 translate-middle">
                  <i class="bi bi-lightning-fill fs-1 hero-icon-lightning"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative elements -->
      <div class="position-absolute top-0 end-0 hero-decorative">
        <img src="../140-1405828_ncaa-football-top-25-2012-alabama-football-logo.png" alt="Alabama Logo" style="height: 15rem; width: auto; opacity: 0.1;">
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="display-5 fw-bold mb-3 features-title">Why Choose EzEats?</h2>
            <p class="lead features-subtitle">Designed specifically for student life with modern features that make cooking simple and affordable</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-lg feature-card">
              <div class="card-body text-center p-5">
                <div class="mb-4">
                  <div class="d-inline-flex align-items-center justify-content-center rounded-circle feature-icon">
                    <i class="bi bi-currency-dollar display-4 text-white"></i>
                  </div>
                </div>
                <h5 class="card-title fw-bold mb-3 feature-title">Budget-Friendly</h5>
                <p class="card-text feature-text">
                  Recipes under $3 per serving. Save money on food while eating well and building healthy habits.
                </p>
                <div class="mt-4">
                  <span class="badge bg-light text-dark px-3 py-2 feature-badge">
                    <i class="bi bi-check-circle me-1" style="color: var(--ua-crimson);"></i>Under $3/serving
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-lg feature-card">
              <div class="card-body text-center p-5">
                <div class="mb-4">
                  <div class="d-inline-flex align-items-center justify-content-center rounded-circle feature-icon">
                    <i class="bi bi-microwave display-4 text-white"></i>
                  </div>
                </div>
                <h5 class="card-title fw-bold mb-3 feature-title">Dorm-Friendly</h5>
                <p class="card-text feature-text">
                  Works with microwave, hot plate, or kettle. No fancy equipment needed - just basic dorm essentials.
                </p>
                <div class="mt-4">
                  <span class="badge bg-light text-dark px-3 py-2 feature-badge">
                    <i class="bi bi-check-circle me-1" style="color: var(--ua-crimson);"></i>No special equipment
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-lg feature-card">
              <div class="card-body text-center p-5">
                <div class="mb-4">
                  <div class="d-inline-flex align-items-center justify-content-center rounded-circle feature-icon">
                    <i class="bi bi-clock display-4 text-white"></i>
                  </div>
                </div>
                <h5 class="card-title fw-bold mb-3 feature-title">Quick & Easy</h5>
                <p class="card-text feature-text">
                  Most recipes ready in 15 minutes or less. Perfect for busy students who need fast, nutritious meals.
                </p>
                <div class="mt-4">
                  <span class="badge bg-light text-dark px-3 py-2 feature-badge">
                    <i class="bi bi-check-circle me-1" style="color: var(--ua-crimson);"></i>15 min or less
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipe Filters -->
    <section class="py-5 filter-section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center mb-4">
              <h3 class="fw-bold mb-2 filter-title">Find Your Perfect Recipe</h3>
              <p class="text-muted">Filter recipes by equipment, budget, and time to find exactly what you need</p>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="card border-0 shadow-sm filter-card">
                  <div class="card-body p-4">
                    <div class="row g-3 align-items-center">
                      <div class="col-md-3">
                        <label class="form-label fw-semibold mb-2 filter-label">
                          <i class="bi bi-gear me-1"></i>Equipment
                        </label>
                        <select class="form-select form-select-lg" id="equipmentFilter">
                          <option value="">All Equipment</option>
                          <option value="microwave">Microwave Only</option>
                          <option value="hotplate">Hot Plate</option>
                          <option value="kettle">Kettle Only</option>
                          <option value="stovetop">Stovetop</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label class="form-label fw-semibold mb-2 filter-label">
                          <i class="bi bi-currency-dollar me-1"></i>Budget
                        </label>
                        <select class="form-select form-select-lg" id="costFilter">
                          <option value="">All Prices</option>
                          <option value="1">Under $1</option>
                          <option value="2">Under $2</option>
                          <option value="3">Under $3</option>
                          <option value="5">Under $5</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label class="form-label fw-semibold mb-2 filter-label">
                          <i class="bi bi-clock me-1"></i>Time
                        </label>
                        <select class="form-select form-select-lg" id="timeFilter">
                          <option value="">All Times</option>
                          <option value="5">Under 5 min</option>
                          <option value="10">Under 10 min</option>
                          <option value="15">Under 15 min</option>
                          <option value="30">Under 30 min</option>
                        </select>
                      </div>
                      <div class="col-md-3 d-flex align-items-end">
                        <button class="btn btn-outline-primary btn-lg w-100" id="clearFilters">
                          <i class="bi bi-arrow-clockwise me-2"></i>Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipes Section -->
    <section id="recipes" class="py-5">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="h2 fw-bold text-primary">Dorm-Friendly Recipes</h2>
            <p class="text-muted">10 budget-friendly recipes perfect for student life</p>
          </div>
        </div>
        <div class="row g-4" id="recipeItems">
          <!-- Recipe items will be populated by JavaScript -->
        </div>
      </div>
    </section>

    <!-- Meal Planning Section -->
    <section id="meal-plans" class="py-5 bg-light">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="h2 fw-bold text-primary">Weekly Meal Plans</h2>
            <p class="text-muted">Pre-planned meals to save time and money</p>
          </div>
        </div>
        <div class="row g-4" id="mealPlanItems">
          <!-- Meal plans will be populated by JavaScript -->
        </div>
      </div>
    </section>

    <!-- Grocery List Section -->
    <section id="grocery" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="card grocery-card">
              <div class="card-header">
                <h5 class="mb-0 grocery-title">
                  <i class="bi bi-list-ul me-2"></i>Your Grocery List
                </h5>
              </div>
              <div class="card-body">
                <div id="groceryList">
                  <p class="text-center grocery-text">Add recipes to build your grocery list</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span id="totalCost" class="grocery-text">Total: $0.00</span>
                  <button class="btn btn-success" id="downloadGroceryList" disabled>
                    <i class="bi bi-download me-1"></i>Download List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 footer">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5 class="fw-bold mb-3 footer-title">
              <img src="../140-1405828_ncaa-football-top-25-2012-alabama-football-logo.png" alt="Alabama Logo" class="me-2" style="height: 1.5rem; width: auto;">EzEats
            </h5>
            <p class="footer-text">
              Making dorm cooking easy, affordable, and delicious for students everywhere.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0 footer-text">
              &copy; 2025 EzEats. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `;
  
  // Initialize components
  renderRecipes();
  renderMealPlans();
  setupEventListeners();
}

// Track time spent on page
function trackTimeSpent() {
  setInterval(() => {
    analytics.timeSpent = Math.floor((Date.now() - analytics.startTime) / 1000);
  }, 1000);
}

// Render recipes
function renderRecipes(filteredRecipes = recipes) {
  if (!recipeContainer) return;
  
  recipeContainer.innerHTML = filteredRecipes.map(recipe => `
    <div class="col-lg-4 col-md-6">
      <div class="card h-100 border-0 shadow-lg recipe-card">
        <div class="card-body d-flex flex-column p-4">
          <div class="text-center mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 recipe-icon">
              <span class="display-4 text-white">${recipe.image}</span>
            </div>
          </div>
          <h5 class="card-title fw-bold mb-3 text-center recipe-title">${recipe.name}</h5>
          <p class="card-text text-center flex-grow-1 mb-4 recipe-text">${recipe.description}</p>
          <div class="mb-4">
            <div class="d-flex flex-wrap gap-2 justify-content-center">
              <span class="badge px-3 py-2 recipe-badge recipe-badge-cost">
                <i class="bi bi-currency-dollar me-1"></i>$${recipe.cost}
              </span>
              <span class="badge px-3 py-2 recipe-badge recipe-badge-time">
                <i class="bi bi-clock me-1"></i>${recipe.time} min
              </span>
              <span class="badge px-3 py-2 recipe-badge recipe-badge-equipment">
                <i class="bi bi-gear me-1"></i>${recipe.equipment}
              </span>
            </div>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary btn-sm flex-grow-1 py-2 recipe-btn" onclick="addToGroceryList(${recipe.id})">
              <i class="bi bi-cart-plus me-1"></i>Add to List
            </button>
            <button class="btn btn-outline-primary btn-sm py-2 recipe-btn recipe-btn-outline" onclick="showRecipeDetails(${recipe.id})">
              <i class="bi bi-eye me-1"></i>View
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render meal plans
function renderMealPlans() {
  if (!mealPlanContainer) return;
  
  mealPlanContainer.innerHTML = mealPlans.map(plan => `
    <div class="col-lg-4 col-md-6">
      <div class="card h-100 border-0 shadow-lg meal-plan-card">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title meal-plan-title">${plan.name}</h5>
          <p class="card-text text-muted flex-grow-1 meal-plan-text">${plan.description}</p>
          <div class="mb-3">
            <span class="h5 text-primary meal-plan-cost">$${plan.totalCost}</span>
            <span class="text-muted ms-2">total</span>
          </div>
          <button class="btn btn-success" onclick="addMealPlanToGroceryList(${plan.id})">
            <i class="bi bi-cart-plus me-1"></i>Add Plan to List
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  if (browseRecipesBtn) {
    browseRecipesBtn.addEventListener('click', () => scrollToSection('recipes'));
  }
  
  if (mealPlanBtn) {
    mealPlanBtn.addEventListener('click', () => scrollToSection('meal-plans'));
  }
  
  // Filter event listeners
  const equipmentFilter = document.getElementById('equipmentFilter');
  const costFilter = document.getElementById('costFilter');
  const timeFilter = document.getElementById('timeFilter');
  const clearFilters = document.getElementById('clearFilters');
  
  if (equipmentFilter) equipmentFilter.addEventListener('change', applyFilters);
  if (costFilter) costFilter.addEventListener('change', applyFilters);
  if (timeFilter) timeFilter.addEventListener('change', applyFilters);
  if (clearFilters) clearFilters.addEventListener('click', clearAllFilters);
  
  // Download grocery list
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadGroceryList);
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Track clicks
  document.addEventListener('click', () => {
    analytics.clicks++;
  });
}

// Scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Apply filters
function applyFilters() {
  const equipment = document.getElementById('equipmentFilter').value;
  const maxCost = document.getElementById('costFilter').value;
  const maxTime = document.getElementById('timeFilter').value;
  
  let filteredRecipes = recipes;
  
  if (equipment) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.equipment === equipment);
  }
  
  if (maxCost) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.cost <= parseFloat(maxCost));
  }
  
  if (maxTime) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.time <= parseInt(maxTime));
  }
  
  renderRecipes(filteredRecipes);
}

// Clear all filters
function clearAllFilters() {
  document.getElementById('equipmentFilter').value = '';
  document.getElementById('costFilter').value = '';
  document.getElementById('timeFilter').value = '';
  renderRecipes();
}

// Add recipe to grocery list
function addToGroceryList(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe) {
    groceryList.push(recipe);
    totalCost += recipe.cost;
    updateGroceryList();
    showNotification(`${recipe.name} added to grocery list!`, 'success');
  }
}

// Add meal plan to grocery list
function addMealPlanToGroceryList(planId) {
  const plan = mealPlans.find(p => p.id === planId);
  if (plan) {
    plan.recipes.forEach(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe && !groceryList.find(r => r.id === recipeId)) {
        groceryList.push(recipe);
        totalCost += recipe.cost;
      }
    });
    updateGroceryList();
    showNotification(`${plan.name} added to grocery list!`, 'success');
  }
}

// Update grocery list display
function updateGroceryList() {
  if (!groceryListContainer || !totalCostElement || !downloadBtn) return;
  
  if (groceryList.length === 0) {
    groceryListContainer.innerHTML = '<p class="text-muted text-center">Add recipes to build your grocery list</p>';
    totalCostElement.textContent = 'Total: $0.00';
    downloadBtn.disabled = true;
  } else {
    groceryListContainer.innerHTML = groceryList.map(recipe => `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <span class="fw-medium">${recipe.name}</span>
          <small class="text-muted d-block">${recipe.ingredients.join(', ')}</small>
        </div>
        <div class="text-end">
          <span class="text-primary fw-bold">$${recipe.cost}</span>
          <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromGroceryList(${recipe.id})">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    `).join('');
    totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
    downloadBtn.disabled = false;
  }
}

// Remove recipe from grocery list
function removeFromGroceryList(recipeId) {
  const index = groceryList.findIndex(r => r.id === recipeId);
  if (index !== -1) {
    totalCost -= groceryList[index].cost;
    groceryList.splice(index, 1);
    updateGroceryList();
  }
}

// Show recipe details
function showRecipeDetails(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe) {
    const modal = new bootstrap.Modal(document.getElementById('recipeModal') || createRecipeModal());
    document.getElementById('recipeModalTitle').textContent = recipe.name;
    document.getElementById('recipeModalBody').innerHTML = `
      <div class="text-center mb-3">
        <span class="display-1">${recipe.image}</span>
      </div>
      <p class="text-muted">${recipe.description}</p>
      <div class="mb-3">
        <span class="badge bg-primary me-1">$${recipe.cost}</span>
        <span class="badge bg-secondary me-1">${recipe.time} min</span>
        <span class="badge bg-info">${recipe.equipment}</span>
      </div>
      <h6>Ingredients:</h6>
      <ul class="list-unstyled">
        ${recipe.ingredients.map(ingredient => `<li>• ${ingredient}</li>`).join('')}
      </ul>
      <h6>Instructions:</h6>
      <p>${recipe.instructions}</p>
    `;
    modal.show();
  }
}

// Create recipe modal
function createRecipeModal() {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'recipeModal';
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="recipeModalTitle">Recipe Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="recipeModalBody"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// Download grocery list
function downloadGroceryList() {
  if (groceryList.length === 0) return;
  
  analytics.groceryDownloads++;
  
  const listContent = groceryList.map(recipe => 
    `${recipe.name} - $${recipe.cost}\nIngredients: ${recipe.ingredients.join(', ')}`
  ).join('\n\n');
  
  const content = `Dorm Chef Grocery List\nGenerated: ${new Date().toLocaleDateString()}\n\n${listContent}\n\nTotal Cost: $${totalCost.toFixed(2)}`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dorm-chef-grocery-list.txt';
  a.click();
  URL.revokeObjectURL(url);
  
  showNotification('Grocery list downloaded!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Analytics reporting (for demo tracking)
function getAnalytics() {
  return {
    ...analytics,
    recipesViewed: groceryList.length,
    avgTimePerRecipe: analytics.timeSpent / Math.max(1, groceryList.length)
  };
}

// Log analytics to console (for demo purposes)
function logAnalytics() {
  console.log('📊 Dorm Chef Analytics:', getAnalytics());
}

// Utility functions
const utils = {
  formatPrice: (price) => `$${price.toFixed(2)}`,
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { recipes, addToGroceryList, getAnalytics, utils };
}

// Log analytics every 30 seconds for demo tracking
setInterval(logAnalytics, 30000);
