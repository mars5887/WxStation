
import {actionOfType, callSearchWxAPI, getHourlyWxAPI} from "../../utilities/rest-services";

export const SEARCH_WX = 'SEARCH_WX';
export const SEARCH_WX_HOURLY = 'SEARCH_WX_HOURLY';
export const SEARCH_WX_COMPLETE = 'SEARCH_WX_COMPLETE';
export const SEARCH_HOURLYWX_COMPLETE ='SEARCH_HOURLYWX_COMPLETE';
export const CANCEL_WX_SEARCH = 'CANCEL_WX_SEARCH'
export const QUERY_ERROR = 'QUERY_ERROR';



export const searchWxEpic = action$ => 	action$.pipe(
	actionOfType(SEARCH_WX, CANCEL_WX_SEARCH),
	callSearchWxAPI(QUERY_ERROR)
)

export const searchHourlyWxEpic = action$ => action$.pipe(
	actionOfType(SEARCH_WX_HOURLY, CANCEL_WX_SEARCH),
	getHourlyWxAPI(QUERY_ERROR)
)