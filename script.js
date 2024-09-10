let changeThemeBtn = document.querySelector(".themeChange")
let body = document.querySelector ("body")

changeThemeBtn.addEventListener("click", changeTheme)

if(localStorage.getItem("theme") == "dark") {
    changeThemeBtn.classList.add("darkTheme")
    body.classList.add("dark")
}

function changeTheme() {
    if(localStorage.getItem("theme") == "dark") {
        changeThemeBtn.classList.remove("darkTheme")
        body.classList.remove("dark")
        localStorage.setItem("theme", "white")
    } else {
        changeThemeBtn.classList.add("darkTheme")
        body.classList.add("dark")
        localStorage.setItem('theme', "dark")
    }
}

let searchBtn = document.querySelector(".search button");
let loader = document.querySelector(".loader");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    searchMovie();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchMovie();
    }
});

function searchMovie() {
    loader.style.display = "block"; 
}

