// Initial References
let resultDiv = document.getElementById("output");
let findButton = document.getElementById("find-btn");
let apiURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

findButton.addEventListener("click", () => {
  let userInput = document.getElementById("recipe-input").value.trim();
  if (!userInput) {
    resultDiv.innerHTML = `<h3>Please enter a recipe name (in english)</h3>`;
    return;
  }

  fetch(`${apiURL}${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.meals) {
        resultDiv.innerHTML = `<h3>No results found</h3>`;
        return;
      }

      let meal = data.meals[0];
      let ingredients = [];
      let count = 1;

      for (let key in meal) {
        if (key.startsWith("strIngredient") && meal[key]) {
          let ingredient = meal[key];
          let measure = meal[`strMeasure${count}`] || "";
          ingredients.push(`${measure} ${ingredient}`.trim());
          count++;
        }
      }

      resultDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="Meal Image">
        <div class="details">
          <h2>${meal.strMeal}</h2>
          <h4>${meal.strArea}</h4>
        </div>
        <div id="ingredients-list"></div>
        <div id="recipe">
          <button id="close-recipe">X</button>
          <pre id="instructions">${meal.strInstructions}</pre>
        </div>
        <button id="view-recipe">View Recipe</button>
      `;

      instructions.style.fontSize = "16px";

      let ingredientsList = document.getElementById("ingredients-list");
      let ingredientsContainer = document.createElement("ul");
      ingredients.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        ingredientsContainer.appendChild(listItem);
      });
      ingredientsList.appendChild(ingredientsContainer);

      let closeRecipeButton = document.getElementById("close-recipe");
      let viewRecipeButton = document.getElementById("view-recipe");
      let recipeDiv = document.getElementById("recipe");


      
      viewRecipeButton.style.display = "block";
      viewRecipeButton.style.margin = "20px auto";
      viewRecipeButton.style.padding = "5px 10px";
      viewRecipeButton.style.cursor = "pointer";
      viewRecipeButton.style.textAlign = "center";
      viewRecipeButton.style.fontSize = "16px";

      closeRecipeButton.style.display = "block";
      closeRecipeButton.style.padding = "5px 10px";
      closeRecipeButton.style.cursor = "pointer";
      closeRecipeButton.style.fontSize = "16px";



      closeRecipeButton.addEventListener("click", () => {
        recipeDiv.style.display = "none";
      });

      viewRecipeButton.addEventListener("click", () => {
        recipeDiv.style.display = "block";
      });
    })
    .catch(() => {
      resultDiv.innerHTML = `<h3>Error fetching data. Please try again.</h3>`;
    });
});
