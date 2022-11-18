import "../css/style.css"
const errorContainer = document.getElementById("input-error");
let elCount = 0;
const btnTrash = document.getElementsByClassName("card-trash-button")

for (let i = 0; i < btnTrash.length; i++) {
    const btn = btnTrash[i];
    btn.addEventListener("click", (ev) => {
        ev.currentTarget.parentElement.remove();
    })
}

document.getElementById("form-weather").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const inputVal = document.getElementById("search-weather").value;
    if (!inputVal) errorContainer.innerText = "veuillez mettre une value !"
    else if (!window.fetch) errorContainer.innerText = "navigateur non compatible"
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang="fr`)
            .then((res) => res.json())
            .then((res) => {
                errorContainer.innerText = ""
                const cardsContainer = document.getElementById("cards-container")
                if (res.cod === "404") return errorContainer.innerText = "ville introuvable !"
                if(document.getElementById(res.name)) return errorContainer.innerText = "la ville existe déjà !"
                cardsContainer.innerHTML += `
                <article class="card" id="${res.name}">
            <button class="card-trash-button" id="${elCount}"><img src="./assets/poubelle.svg" class="card-trash-img"></button>
            <h2 class="card-city" data-pays="${res.sys.country}">${res.name}</h2>
            <div class="card-metric">${res.main.temp}<sup class="card-celcius">°C</sup></div>
            <img class="card-weather-img" src="http://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png" alt="">
            <p class="card-description">${res.weather[0].description}</p>
          </article>`
          elCount++
            })
            .catch((err) => {
                console.error("error:", err);
                errorContainer.innerText = "une erreur est survenue veuillez réessayer plus tard !"
            })
    }
})