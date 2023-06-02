const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const apiKey = 'a101c9824b3a2ccce4b573164fc0f7a3';

app.get('/', (req, res) => {
    res.send('Welcome to the weather API!');
});

app.post('/getWeather', async (req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = {};

        // Fetch weather for each city
        for (const city of cities) {
            const weather = await getWeather(city);
            weatherData[city] = weather;
        }

        res.json({ weather: weatherData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

async function getWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const { temp } = response.data.main;
        return `${temp}°C`;
    } catch (error) {
        console.error('Error:', error);
        return 'N/A';
    }
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
