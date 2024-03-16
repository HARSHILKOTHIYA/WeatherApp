let drfcity = "london";

const search = document.querySelector(".wether-search");
const city_date = document.querySelector(".city-date");
const cityname = document.querySelector(".city-name");
const btn = document.querySelector(".btn")
const forcast = document.querySelector(".wether-forcast");
const wether_icon = document.querySelector(".wether-icon");
const tempture = document.querySelector(".tempture");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const real_feel = document.querySelector(".real-feel");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");


function convert(val)
{
    return (val-273).toFixed(2);
}


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country);
}

const apik = "3045dd712ffe6e702e3245525ac7fa38";

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let city = search.value;
    if(city=="")
    city = drfcity

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+'&appid='+apik)
    .then((res)=> res.json())
    .then((data)=>{
        cityname.innerHTML = `${city}, ${convertCountryCode(data.sys.country)}`;

        const date = new Date();
        city_date.innerHTML = `${date.toUTCString()}`; 

        forcast.innerHTML = `${data['weather'][0]["description"]}`;

        wether_icon.innerHTML= `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
        tempture.innerHTML = `${convert(data["main"]["temp"])}&#176C`;
        min.innerHTML = `Min: ${convert(data["main"]["temp_min"])}&#176C`;
        max.innerHTML = `Max: ${convert(data["main"]["temp_max"])}&#176C`;

        real_feel.innerHTML = `${convert(data["main"]["feels_like"])}&#176C`;
        pressure.innerHTML = `${data["main"]["pressure"]}hPa`;
        humidity.innerHTML = `${data["main"]["humidity"]}%`;
        wind.innerHTML = `${data["wind"]["speed"]}m/s`;
        
        search.value = "";
        
    }).catch((err)=>{
        console.log("error :", err);
    })
})
