// Obj con el llamado al API y funcion de obtencion de datos: nombre de la ciudad,
//temperatura, descripcion, humedad, viento, icono
let weather = {
    apiKey: "3f7c6833b25831a6f68ad27695257f20",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
          .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
      displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + "° C";
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080?" + name +"')";
    },
    // Funcion de la barra y el boton de busqueda
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

//Evento para el boton de busqueda
document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
});

//Evento para la barra de busqueda
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search()
    }
});

