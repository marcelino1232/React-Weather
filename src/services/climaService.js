export default async function getWeather(city){
    try{
        const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`);  
        const response = await request.json();
        return response;
    }catch(error){
        return error;
    }
}