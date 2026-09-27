import { useEffect, useState } from 'react'
import getWeather from './services/climaService'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'

import Loading from './components/Loading'
import Weather from './components/Weather'

function App() {
  const [city,setCity] = useState("");

  const [weather, setWeather] = useState({
    message:undefined,
    loading:false,
    temperatura:"",
    humedad:"",
    clima:""
  });

  useEffect(() => {
    if(weather.message != undefined){
    const timer = setTimeout(() => setWeather(prev => ({...prev,message:undefined})),800);

    // 2. Return a cleanup function to clear the timeout
    return () => clearTimeout(timer);
   }
  },[weather.message]);

  const onsubmitEvent = async(e) => {
    e.preventDefault();
    if(e.target.checkValidity()){
        setWeather(prev => ({...prev,loading:true}))
        const response = await getWeather(city);
        if(response.message == undefined || response.message == ""){
          let temperatura = response.main.temp - 273;
          setWeather({loading:false,temperatura:temperatura.toFixed(2),humedad:response.main.humidity,clima:response.weather[0].main,message:undefined});
        }else{
          setWeather(prev => ({...prev,loading:false,clima:"",message:response.message}));
        }
        e.target.classList.remove("was-validated");
      }else{
        e.target.classList.add("was-validated");
      }
  }

  const onchangeEvent = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  }

  return (
    <>
    <div className='bg-primary'>
      <div className=' container py-2'>
        <p className='lead title mb-0'>Weather</p>
      </div>
    </div>
    <div className=' container mt-5'>
      <div className='row '>
        <div className="col-12 col-md-4">
          <img src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png" alt="weather image"  className='img' />
        </div>
        <div className="col-12 col-md-8">
        
          <form className='form d-grid needs-validation' onSubmit={onsubmitEvent} noValidate>
            {
              !weather.message == "" && (
                <div className='alert alert-danger text-center'>
                  <p className='mb-0 h5'>{weather.message}</p>
                </div>
              )
            }
            <input 
            type="text"
            className='input-line'
            placeholder='Enter the city' 
            required
            onChange={onchangeEvent} value={city}  />
            <div className="invalid-feedback  my-1 msg">
              Please provide a city
            </div>
            <button className={`btn btn-primary text-uppercase mt-3 py-3 fw-bold ${city.length <= 0 && "disabled"}`} >GET THE Weather</button>
           
            {weather.loading && <Loading />}
            <Weather 
            loading={weather.loading}
            clima={weather.clima}
            humedad={weather.humedad}
            temperatura={weather.temperatura}
            message={weather.message}
             />
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
