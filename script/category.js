const updateCategoryTable = () => {
    fetch("https://localhost:7083/api/categories", {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("categories-table-content").innerHTML = "";

            data.forEach(category => {
                const newRow = document.createElement("tr");
                const newNo = document.createElement("td");
                const newName = document.createElement("td");
                const newActions = document.createElement("td");

                newNo.textContent = category.categoryID;
                newName.textContent = category.categoryName;

                newRow.appendChild(newNo);
                newRow.appendChild(newName);

                const editButton = document.createElement("button")
                editButton.className = "edit-button"
                editButton.id = `edit-${category.categoryID}`
                editButton.textContent = "Edit"
                
                editButton.addEventListener("click", () => {
                    const popup = document.getElementById("edit-category-popup");
                    popup.style.display = "block";

                    document.getElementById("edit-popup-close").addEventListener("click", () => {
                        popup.style.display = "none";
                    });

                    const categoryName = document.getElementById("edit-category-input")
                    categoryName.value = category.categoryName

                    document.getElementById("submit-edit-category").addEventListener("click", () => {
                        const requestBody = JSON.stringify({
                            "categoryName": categoryName.value
                        })
            
                        fetch(`https://localhost:7083/api/categories/${category.categoryID}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: requestBody
                        })
                            .then(_ => {
                                popup.style.display = "none";
                                location.reload();
                            })
                    });
                })

                const deleteButton = document.createElement("button")
                deleteButton.className = "delete-button"
                deleteButton.id = `delete-${category.categoryID}`
                deleteButton.textContent = "Delete"

                deleteButton.addEventListener("click", () => {
                    const popup = document.getElementById("delete-category-popup");
                    popup.style.display = "block";

                    document.getElementById("delete-popup-close").addEventListener("click", () => {
                        popup.style.display = "none";
                    });

                    document.getElementById("submit-delete-category").addEventListener("click", () => {
                        fetch(`https://localhost:7083/api/categories/${category.categoryID}`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then(_ => {
                                popup.style.display = "none";
                                location.reload();
                            })
                    });
                })

                newActions.appendChild(editButton)
                newActions.appendChild(deleteButton)
                newRow.appendChild(newActions);

                document.getElementById("categories-table-content").appendChild(newRow);
            })
        })
}

const addCategoryOnClick = () => {
    document.getElementById("add-category").addEventListener("click", () => {
        const popup = document.getElementById("add-category-popup");
        popup.style.display = "block";

        document.getElementById("add-popup-close").addEventListener("click", () => {
            popup.style.display = "none";
        });

        document.getElementById("submit-add-category").addEventListener("click", () => {
            const categoryName = document.getElementById("add-category-input").value
            const requestBody = JSON.stringify({
                "userID": 1,
                "categoryName": categoryName
            })

            fetch("https://localhost:7083/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody
            })
                .then(_ => {
                    popup.style.display = "none";
                    location.reload();
                })
        })
    });
}

const main = () => {
    addCategoryOnClick();
    updateCategoryTable();
}

main()