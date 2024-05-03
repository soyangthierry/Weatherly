import Styles from './page.module.scss';
import { IoPowerSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import cloudyDayIcon from '../assets/images/weather_icons/animated/cloudy.svg';
import rainyIcon from '../assets/images/weather_icons/animated/rainy-1.svg';
import sunnyIcon from '../assets/images/weather_icons/animated/cloudy-day-1.svg';
import snowyIcon from '../assets/images/weather_icons/animated/snowy-1.svg';
import thunderIcon from '../assets/images/weather_icons/animated/thunder.svg';
import defaultIcon from '../assets/images/weather_icons/animated/weather.svg';
import windIcon from '../assets/images/wind-svgrepo-com.svg';
import humidIcon from '../assets/images/thermometer-svgrepo-com.svg';
import sunriseIcon from '../assets/images/sun-behind-small-cloud-svgrepo-com.svg';
import sunsetIcon from '../assets/images/sun-behind-large-cloud-svgrepo-com.svg';
import visibility from '../assets/images/visibility-view-svgrepo-com.svg';
import { useEffect, useState } from 'react';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

export default function Page(){
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [location,setLocation] = useState('Buea');
    const [locTemp, setLocTemp] = useState('');
    const [userName,setUserName] = useState('');
    

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // const uid = user.uid;
            console.log(user)
            setUserName(user.email)
            // ...
        } else {
            navigate('/login');
        }
        });
    },[navigate])
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0458cbf44c10ab844b1d94ed5cb7d4a9`);
                if(response.ok){
                    const data = await response.json();
                    setWeatherData(data);
                    setLoading(false);
                    setError('');
                } else {
                    setError('Invalid location. Please try again.');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching weather data');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [location]);

    const signUserOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed out!")

        }).catch((error) => {
        // An error happened.
        console.log("Couldn't sign out",error.message)
        });
    }

    const submitLoc = () => {
        setLocation(locTemp);
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { hour: 'numeric', minute: '2-digit' };
        return date.toLocaleTimeString([], options);
    }


    const determineWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
          case 'Clouds':
            return cloudyDayIcon;
          case 'Rain':
            return rainyIcon;
          case 'Clear':
            return sunnyIcon;
          case 'Thunderstorm':
            return thunderIcon;
          case 'Snow':
            return snowyIcon;
          default:
            return defaultIcon;
        }
      };

      const mainImage = weatherData?.weather[0]?.main ? determineWeatherIcon(weatherData?.weather[0]?.main) : defaultIcon;

    return(
        <>
            {(<div className={Styles.container}>
                <div className={Styles.wrapper}>
                    <div className={Styles.mainInfo}>
                        <div className={Styles.controls}>
                            <div className={Styles.logout}>
                                <IoPowerSharp className={Styles.icon} onClick={signUserOut}/>
                            </div>
                            <div className={Styles.initials} title={userName}>
                                {userName[0]}
                            </div>
                        </div>
                        <div className={Styles.errorBox}>
                            {error}
                        </div>
                        <div className={Styles.searchBox}>
                            <input type="text" placeholder='Enter location here'
                              onChange={(e)=>{
                                setLocTemp(e.target.value);
                                console.log(locTemp);
                              }}
                              onKeyDown={(e)=>{
                                if (e.key === 'Enter') {
                                    submitLoc()
                                  }
                              }}
                              value={locTemp}
                            />
                            <IoIosSearch className={Styles.icon}
                                onClick={submitLoc}
                            />
                        </div>
                        <div className={Styles.weatherText}>
                            <div>
                            <h2>{loading?"...":error!=''? "error":(<>{(weatherData?.main.temp-272.15).toFixed(1)}<sup>°C</sup></>)}</h2>
                            <img src={mainImage} alt="" />
                            </div>
                            <p>{loading?"loading..":error!=''? "error":new Date(weatherData?.dt * 1000).toDateString()},<span>{loading?"loading..":error!=''? "error":formatTime(weatherData?.dt)}</span></p>
                        </div>
                        <div className={Styles.weatherTextSub}>
                            <div><img src={mainImage} alt="" /><span>{loading?"loading...":weatherData?.weather[0]?.main}</span></div>
                            <div><span>{loading?"loading...":error!=''? "error":weatherData?.weather[0]?.description}</span></div>
                        </div>
                        <div className={Styles.weatherArea}>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2>{loading?"loading...":error!=''? "error":(<>{`${weatherData?.name}, ${weatherData?.sys?.country}`}</>)}</h2>
                        </div>
                    </div>
                    <div className={Styles.extraInfo}>
                        <h2>Today's HighLights</h2>
                        <div className={Styles.extraInfoBox}>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Feels like</h2>
                                <h2 className={Styles.HeadingMinor}>
                                   { loading ? "loading...":error!=''? "error":(<>{(weatherData?.main?.feels_like-272.15).toFixed(1)}<sup> °C</sup></>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={humidIcon} alt="temperature" />
                                </div>
                            </div>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Wind Status</h2>
                                <h2 className={Styles.HeadingMinor}>
                                    {loading? "loading...":error!=''? "error":(<>{(weatherData?.wind?.speed)}<span>Km/h</span></>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={windIcon} alt="wind speed" />
                                </div>
                            </div>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Visibility</h2>
                                <h2 className={Styles.HeadingMinor}>
                                {loading? "loading...":error!=''? "error":(<>{(weatherData?.visibility/1000).toFixed(2)}<span>km</span></>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={visibility} alt="visibility" />
                                </div>
                            </div>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Sunrise</h2>
                                <h2 className={Styles.HeadingMinor}>
                                {loading? "loading...":error!=''? "error":(<>{formatTime(weatherData?.sys?.sunrise)}</>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={sunriseIcon} alt="sunrise" />
                                </div>
                            </div>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Sunset</h2>
                                <h2 className={Styles.HeadingMinor}>
                                {loading? "loading...":error!=''? "error":(<>{formatTime(weatherData?.sys?.sunset)}</>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={sunsetIcon} alt="sunset" />
                                </div>
                            </div>
                            <div className={Styles.infoBox}>
                                <h2 className={Styles.HeadingMajor}>Humidity</h2>
                                <h2 className={Styles.HeadingMinor}>
                                {loading? "loading...":error!=''? "error":(<>{(weatherData?.main?.humidity)}<span>%</span></>)}
                                </h2>
                                <div className={Styles.extra}>
                                    <img src={humidIcon} alt="humidity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}