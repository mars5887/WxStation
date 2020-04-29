import {SEARCH_WX, SEARCH_WX_HOURLY,  SEARCH_WX_COMPLETE, SEARCH_HOURLYWX_COMPLETE, QUERY_ERROR} from './epics';


export const searchwx = ( state={searchWxTerm:'', searchResults:'', searchHourly:false},  action) => {

	switch( action.type ) {

		case SEARCH_WX:
			console.log("reducer search WX")
			return {searchHourly:false, searchResults:''};
		case SEARCH_WX_HOURLY:
			console.log("reducer search WX")
			return {searchHourly:true, searchResults:''};

		case SEARCH_WX_COMPLETE:
			
			return {...state, searchResults: action.payload}
		case SEARCH_HOURLYWX_COMPLETE:
			
			return {...state, searchResults: action.payload}


		case QUERY_ERROR:
			return true;

		default: 
		    return state;
	}
}