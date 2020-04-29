import React from 'react';
import Map from './Map';
import {getEnUSLocalTime} from '../../utilities';
import '../../static/css/wx.css';


export const WxCoord = (props) => {

	return (
		<div className="display wx-location">
			<p>Lattitude: {props.lat}</p>
			<p>Longitude: {props.lon}</p>
		</div>
	);
}

export const WxWeather = (props) => {

	return (
		<div className={props.style}>
			<div>
				<div>Conditions: {props.main} - {props.description}</div>
			</div>
						
		</div>
	);
}

export const WxMain = (props) => {

	const temperatureImg =  '../../images/fahrenheit_temperature-512.png';
	const pressureImg = '../../images/meteo_barometer-512.png';
	const humidityImg = '../../images/humidity.png';

	return (
		<div className={ props.style + " wx-main"}>
			<div className="display-flex pad-left-3 wx-temp">
				<div>{(props.temp_min.toFixed())}&deg;</div>
				<div> {' < '}{props.temp.toFixed()}&deg;{' > '}</div>
				<div> {props.temp_max.toFixed()}&deg;</div>
				<div className="temp-img">
				  < img className="img-small-20" src={temperatureImg}/>
			   </div>	
			</div>
			<div className="display-flex pad-left-3 wx-pressure">
				<div>{props.pressure}</div>	
				<div className="pressure-img">
				  < img className="img-small-20" src={pressureImg}/>
			   </div>
            </div>
			<div className='display-flex pad-left-3'>
			   <div> {props.humidity}</div>
			   <div className="humidity-img">
				  < img className="img-small-20 pad-left-20" src={humidityImg}/>
			   </div>
			</div>
		</div>
	);
}

export const WxWind = (props) => {

	const getSockImg = () => {

		if ( props.speed && props.speed < 3 ) {
			return 1;
		} 
		else if ( props.speed && props.speed < 6 ) {
			return 3;
		}
		else if ( props.speed && props.speed < 9 ) {
			return 6;
		}
		else if ( props.speed && props.speed < 12 ) {
			return 9;
		}
		else if ( props.speed && props.speed < 15 ) {
			return 12;
		}
		else {
			return 15;
		}
		  
	}
	
	const sockImg = props.speed && `../../images/wind-sock/${getSockImg()}-wind-speed.png`;
	const gustStyle = props.gust ? "" : "display-none";

	return (
		<div className="display-flex wx-wind">
			<div >
				<img className={props.style} src={sockImg}/>
			</div>
			<div className="pad-right-2">
				Wind Speed: {props.speed}
			</div>	
			<div className="pad-right-2"> Direction: {props.deg}</div>
			<div className={gustStyle}> Gust: {props.gust}</div>
		</div>
	);
}

export const WxSys = (props) => {

	const sunriseImg =  '../../images/sunrise.png';
	const sunsetImg = '../../images/sunset.png';
	return (
		<div className="display wx-sys">
			<div>Country: {props.country}</div>
			<div className="display-flex pad-left-3">
			<div>Sunrise:</div> 
			<div>{  getEnUSLocalTime( new Date( props.sunrise ) ) }</div>
			<div><img className="img-small-40" src={sunriseImg}/></div>
            <div className="pad-left-3">Sunset: </div>
			<div>{ getEnUSLocalTime( new Date( props.sunset	) ) }</div>
			<div><img className="img-small-40" src={sunsetImg}/></div>
			</div>
		</div>
	);
}


export const WxName = (props) => {
	return (
		<div className="display wx-name">
			{props.name} Weather
		</div>
	);
}

export const WxMap = (props) => {
	
	const center = [props.lat?props.lat:-0.09, props.lon?props.lon:51.505];
	console.log("WxMAP " +center)
	let markersData = [
      { latLng: { lat: props.lat, lng: props.lon }, title: props.title }
	]
	console.dir("WxMAP " +markersData)
	return (		
		<div className="wx-map">
			<Map markersData={markersData} lat={props.lat} lon={props.lon} />
		</div>
	);
		
	
}

