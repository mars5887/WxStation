import { filter, debounce, takeUntil, tap,catchError, switchMap, map, } from "rxjs/operators";
import { ofType } from "redux-observable";
import { interval } from 'rxjs';
import { ajax } from "rxjs/ajax";
import {SEARCH_WX_COMPLETE, SEARCH_HOURLYWX_COMPLETE} from '../../state/searchWx/epics';

export const actionOfType = (actionId, cancelId) => (action$) => {
	return action$.pipe(
		tap(val => console.log("epic val: "+ JSON.stringify(val) )),
		ofType(actionId),
		debounce(() => interval(500)),
		takeUntil(
			action$.pipe(
				filter(action => action.type === cancelId),
		)));
}

const WX_API_DOMAIN = 'http://api.openweathermap.org/data/2.5/';
const WX_PATH = 'weather';
const FORCAST_PATH = 'forecast';
const API_KEY = '?apikey=3c4a0dcc433a2891f128f970d384f80d';
const tempUnits = '&units=imperial';
const countryCode = 'us';
//pro.openweathermap.org/data/2.5/forecast/hourly?q={city name},{country code}

const fetchWxFulfilled = payload => ({ type: SEARCH_WX_COMPLETE, payload });
const fetchHourlyWxFulfilled = payload => ({ type: SEARCH_HOURLYWX_COMPLETE, payload });
const handleError = (type, payload) => ([{ type: type, error: true, payload }]);


export const callSearchWxAPI = (errorCase) => (action$) => {
	return action$.pipe(
		switchMap( (action) => 
		ajax.getJSON(`${WX_API_DOMAIN}${WX_PATH}${API_KEY}&zip=${action.payload},${countryCode}${tempUnits}`)
			.pipe(
				map( response => fetchWxFulfilled(response)),
				catchError( payload => handleError(errorCase, payload))
			)
	));
}

export const getHourlyWxAPI = (errorCase) => (action$) => {
	return action$.pipe(
		switchMap( (action) => 
		ajax.getJSON(`${WX_API_DOMAIN}${FORCAST_PATH}${API_KEY}&zip=${action.payload},${countryCode}${tempUnits}`)
			.pipe(
				map( response => fetchHourlyWxFulfilled(response)),
				catchError( payload => handleError(errorCase, payload))
			)
	));
}