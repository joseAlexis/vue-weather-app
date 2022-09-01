<template>
    <div class="weather-container">
        <div class="weather-wrap">
            <div class="search-box">
                <input type="text" placeholder="Search..." class="search-bar" v-model="query"
                    v-on:keypress="fetchWeather" cy-data="searchRegion" />

                <button cy-data="userAccount" class="button">
                    <img src="../assets/user-account.png" alt="User Account" class="img-login">
                </button>
            </div>

            <div class="weather-info" v-if="weather.main !== undefined">
                <div class="location-box">
                    <div class="location" cy-data="region">{{ weather.name }}, {{ weather.sys.country }}</div>
                    <div class="date" cy-data="date">{{ todaysDate() }}</div>
                </div>
                <div class="weather-box">
                    <div class="temp" cy-data="temp">{{ Math.round(weather.main.temp) }}°c</div>
                    <div class="weather" cy-data="weather">{{ weather.weather[0].main }}</div>
                    <div class="icon">
                        <img :src="`${siteUrl}/img/wn/${weather.weather[0].icon}${'@2x.png'}`" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
    data() {
        return {
            api_key: "",
            apiUrl: "http://api.openweathermap.org",
            siteUrl: "http://openweathermap.org",
            query: "",
            regions: [],
            weather: {},
        }
    },
    methods: {
        async fetchWeather(e) {
            if (e.key === "Enter") {
                let response = await axios.get(`${this.apiUrl}/data/2.5/weather?q=${this.query}&units=metric&APPID=${this.api_key}`);
                this.setResults(response)
            }
        },
        setResults(response) {
            this.weather = response.data
        },
        todaysDate() {
            return dayjs().format('DD MMM YYYY')
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat";
}

.weather-container {
    background-image: url("../assets/background.jpg");
    background-size: cover;
    background-position: center;
    transition: 0.4s;
    width: 450px;
    margin: 0 auto;
    border-radius: 25px;
    margin-top: 50px;
    box-shadow: 0px 0px 30px #00000065;
}

.weather-wrap {
    height: 600px;
    padding: 25px;
    border-radius: 25px;
    background-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.4));
}

.search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    transition: 0.4s;
}

.search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
}

.search-box .button {
    float: right;
    margin: 0;
    border: 0;
    background-color: transparent;
}

.location-box .location {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    font-style: italic;
    text-align: center;
    margin-top: 30px;
}

.location-box .date {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    text-align: center;
}

.weather-box {
    text-align: center;
}

.weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #fff;
    font-size: 102px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    font-style: italic;
}

.weather-box .weather {
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>