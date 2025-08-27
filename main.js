const search = document.getElementById("input-search")
const weatherContent = document.getElementById("weather-content")
const weatherName = document.getElementById("weather-name")
const temperature = document.getElementById("temperature")

const searchCountry = async () => {
    const apiKEY = 'b9a24ac376cf2e2e17163d15018594e5'
    const city = search.value.trim()
    
    if (!city) {
        weatherContent.innerHTML = `<div>
    <h2>Empty Input!</h2>
    <p>Please try again with a valid <u>city name</u>.</p>
    </div>`
        return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=metric`
    
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("City not found, try again or search for other")
        }
        
        const data = await response.json()
        console.log(data)
        
        // Extraer datos de la respuesta de la API
        const { name } = data
        const { temp } = data.main
        const { icon, description } = data.weather[0]

        //insertar los datos ya almacenados al html
        weatherContent.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
            <h1 id="weather-name">${name}</h1>
            <span id="temperature">${temp}&#176;C</span>
            <p>${description}</p>
        `
    } catch (error) {
        weatherContent.innerHTML = `<h2>${error.message}</h2>`
        alert(error.message)
    }
}
