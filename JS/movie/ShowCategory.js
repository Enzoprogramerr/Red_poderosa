const categoryContainer = document.getElementById("category_container");
const categoryReviewedContainer = document.getElementById("category_reviewed_container");
const categoryOscarAwardContainer = document.getElementById("category_oscar_award_container");

categoryContainer.innerHTML = "";
categoryReviewedContainer.innerHTML = "";
categoryOscarAwardContainer.innerHTML = "";

const categories = getCategories();
const categoriesReviewed = getCategoriesReviewed();
const categoriesOscarAward = getCategoriesOscarAward();

const categoriesList = [
    { container: categoryContainer, categories: categories },
    { container: categoryReviewedContainer, categories: categoriesReviewed },
    { container: categoryOscarAwardContainer, categories: categoriesOscarAward }
];

categoriesList.forEach(({ container, categories }) => {
    categories.forEach(category => {
        let classCategory = new Category(category);
        let node = classCategory.getNode() 
        container.append(node);
        // container.innerHTML += classCategory.getTemplete();
    });
});
