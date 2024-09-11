let changeThemeBtn = document.querySelector(".themeChange");
let body = document.querySelector("body");

changeThemeBtn.addEventListener("click", changeTheme);

if (localStorage.getItem("theme") == "dark") {
  changeThemeBtn.classList.add("darkTheme");
  body.classList.add("dark");
}

function changeTheme() {
  if (localStorage.getItem("theme") == "dark") {
    changeThemeBtn.classList.remove("darkTheme");
    body.classList.remove("dark");
    localStorage.setItem("theme", "white");
  } else {
    changeThemeBtn.classList.add("darkTheme");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

let searchBtn = document.querySelector(".search button");
let loader = document.querySelector(".loader");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  searchMovie();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovie();
  }
});

async function searchMovie() {
  loader.style.display = "block";

  let searchText = document.querySelector(".search input").value;

  let response = await sendRequest("http://www.omdbapi.com/", "GET", {
    apikey: "ee82f70e",
    t: searchText,
  });

  if (response.Response == "False") {
    loader.style.display = "none";
    alert(response.Error);
} else {
    let main = document.querySelector(".main");
    main.style.display = "block";
    let movieTitle = document.querySelector(".movieTitle h2");
    movieTitle.innerHTML = response.Title;
    let movieImg = document.querySelector(".movieImg");
    movieImg.style.backgroundImage = `url(${response.Poster})`;

    console.log(response)

    let detailsList = [
        "Genre",
        "Actors",
        "Country",
        "Director",
        "Language",
        "Plot",
        "Released",
        "Runtime",
        "imdbRating",
    ];
    let movieInfo = document.querySelector(".movieInfo");
    movieInfo.innerHTML = "";

    for (let i = 0; i < detailsList.length; i++) {
        let param = detailsList[i];

        let desc = document.createElement("div");
        desc.className = "desc darkBg";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = param;

        let value = document.createElement("div");
        value.className = "value";
        value.innerHTML = response[param];

        desc.appendChild(title);
        desc.appendChild(value);
        movieInfo.appendChild(desc);
    }
    loader.style.display = "none";
}
}

async function sendRequest(url, method, data) {
  if (method == "POST") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = JSON.parse(response);
    return response;
  } else if (method == "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });

    response = await response.json();
    return response;
  }
}
