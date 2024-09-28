const addUserOnClick = () => {
    document.getElementById("submit-register").addEventListener("click", () => {
        const name = document.getElementById("name-register").value
        const email = document.getElementById("email-register").value
        const password = document.getElementById("password-register").value 
        const confirmPassword = document.getElementById("confirm-password-register").value 

        const requestBody = JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        })

        fetch("https://localhost:7083/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody
        })
            .then(_ => {
                location.href = "index.html"
            })
    });
}

const main = () => {
    addUserOnClick();
}

main()