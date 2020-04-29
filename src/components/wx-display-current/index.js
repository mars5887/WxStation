import React from 'react';
import {WxCoord, WxWeather, WxMain, WxName, WxSys, WxWind, WxMap} from '../wx'


const WxCurrentDisplay = ( props ) => {
	
	const results = props.searchResults;
	const timezone = results.timezone;
	const {lon, lat} = results ? results.coord : {lat:'', lon:''};
	const [weather] = results ? results.weather : [];
	const location = results ? results.name : '';
	const {main, description, icon} = weather ? weather : {main:'', description:'', icon:''};
	const {temp, pressure, humidity, temp_min, temp_max} = results ? results.main ? props.searchResults.main : {} : {};
	const {country, sunrise, sunset} = results ? results.sys ? results.sys : {} : {};
	const {speed, deg, gust} = results ? results.wind ? results.wind : {} :{};
	
	return (
		<div className="container">
		
			<WxName name={location} />
			<WxMap lat={lat} lon={lon} title={location}/>
			<WxSys country={country} sunrise={sunrise} sunset={sunset} timezone={timezone} />
			
			<WxWeather main={main} description={description} icon={icon} style={'display'}/>
			<div className="display">
				<WxMain temp={temp} pressure={pressure} humidity={humidity} temp_min={temp_min} temp_max={temp_max} />
			</div>
			<WxWind speed={speed} deg={deg} gust={gust} style={'img-medium-100'} />
		</div>
	)
}

export default WxCurrentDisplay;