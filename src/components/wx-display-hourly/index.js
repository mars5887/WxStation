import React from 'react';
import {WxCoord, WxWeather, WxMain, WxName, WxSys, WxWind, WxMap} from '../wx'
import {getWxItemsByDay, getDayOfWeek} from '../../utilities';


const WxHourlyDisplay = ( props ) => {
	
	const results = props.searchResults;
	
	const city = results.city;

	const {lon, lat} = city ? city.coord : {lat:'', lon:''};
	const {temp, pressure, humidity, temp_min, temp_max} = results ? results.main ? props.searchResults.main : {} : {};
	const {name, country, sunrise, sunset} = city ? city : {};
	const hourlyWx = results.list ? results.list : [];
	
	
	
	
	const Time = (props) => {
		
		const d = new Date(Date.parse(props.date));
		console.log(d);
		return (<div className="wx-time"> {(d.toLocaleTimeString("en-us", { hour: '2-digit', minute: '2-digit' }))}</div>);
	}

	const Day = (props) => {
		const d = new Date(Date.parse(props.items[0].dt_txt));
	    return (
			<div className="display">
			<div className="wx-day-header"> 
			   {getDayOfWeek(d)} {d.getDate()}
			</div> 
			<div>
				{ props.items.map( (item, i) => (  
							<ListItem key={i} value={item}>  </ListItem> 
						  ))
				}
			</div>
		  </div>
		);
	}

	const ListItem = ({ value, click }) => {
		console.log("listItem");
		console.log(value);
		const {temp, pressure, humidity, temp_min, temp_max} = value ? value.main ? value.main : {} : {};
		const { speed, deg, gust} = value ? value.wind ? value.wind : {} : {};
		const { main, description, icon } = value.weather ? value.weather[0] ? value.weather[0] : {} : {};
		return (
			<div className="display-block"> 
				<Time date={value.dt_txt}/>
				<WxWeather main={main} description={description} icon={icon} style={'display wx-res-list'} />
				<WxMain temp={temp} pressure={pressure} humidity={humidity} temp_min={temp_min} temp_max={temp_max} style={''} />
				<WxWind isHourly={true} speed={speed} deg={deg} gust={gust} style={'img-small-50'}/>
			</div>
		)
	};

	const List = ({ items }) => {

		let days = getWxItemsByDay(items);
		console.log( 'days: '); console.log(days);
		
		let keys = Object.keys(days);
		return (
            <div >
				{keys.map( key => (
				  <Day key={key} items={days[key]} >
					
				  </Day>
				  
				))}
			</div>
		)
    };

	return (
		<div className="container">
	
			<WxName name={name} />
			<WxMap lat={lat} lon={lon} />
			<WxSys country={country} sunrise={sunrise} sunset={sunset} />
			<List items={hourlyWx}/>
			
		</div>
	)
}

export default WxHourlyDisplay;