const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");


registerBtn.addEventListener("click", () =>{
    container.classList.add("active")
});


loginBtn.addEventListener("click", () =>{
    container.classList.remove("active")
});

//registrar usuarios

const signUpForm = document.getElementById("sign-up")


signUpForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    const name = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const password = document.getElementById("contraseña").value

    const Users = JSON.parse(localStorage.getItem("users")) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert("el usuario ya esta registrado")
    }
    Users.push({name: name, email: email, password: password})
    localStorage.setItem("users", JSON.stringify(Users))
    alert("registro exitoso")
    container.classList.remove("active")

    
})

//login

const loginForm = document.getElementById("sign-in")

loginForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    const email = document.getElementById("emaill").value
    const password = document.getElementById("contraseñal").value

    const Users = JSON.parse(localStorage.getItem("users")) || []
    const validUser = Users.find(user => user.email === email && user.password === password)
    if(!validUser){
        return alert("Usuario y/o contraseña incorrectos")
    }
    alert(`bienvenido ${validUser.name}`)

    localStorage.setItem("currentUser", JSON.stringify(validUser))

    window.location.href = "dashboard.html"
    
})