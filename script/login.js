const checkLoginCredentials = () => {
    document.getElementById("submit-login").addEventListener("click", () => {
        const email = document.getElementById("email-login").value
        const password = document.getElementById("password-login").value
        const requestBody = JSON.stringify({
            "email": email,
            "password": password
        })
    
        fetch("https://localhost:7083/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody
        })
            .then(_ => {
                location.href = "category.html"
            })
    })
}

const main = () => {
    checkLoginCredentials();
}

main()