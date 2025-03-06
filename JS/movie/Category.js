class Category {
    constructor(category)  {
        this.id = category.id,
        this.description = category.category;
    }

    getTemplete = () => {
        return `
            <input type="radio" id="category_${this.id}" class="input-form" name="category_movies" value="${this.description}">
            <label for="category_${this.id}">${this.description}</label>
        `;
    }

    getNode = () => {
        let category = document.createElement("button");
        category.className = "input-form";
        category.innerText = this.description;

        category.addEventListener("click", (e) => {
            alert("Seleccionaste la categoria " + this.description)
            e.target.className = "input-form selected"
        });

        return category;
    }
}