import React, {useState} from 'react';
import { connect } from 'react-redux'
import { ZipSearch } from "../../components/wx-search";
import WxCurrentDisplay from '../../components/wx-display-current';
import WxHourlyDisplay from '../../components/wx-display-hourly';

const searchWx = (value) => ( 
	console.log("zipSearch -seachWx: "+value),
	{ type: 'SEARCH_WX', payload: value }
);

const searchHourlyWx = (value) => ( 
	console.log("zipSearch -seachHourlyWx: "+value),
	{ type: 'SEARCH_WX_HOURLY', payload: value }
);

function Display(props) {
	const isHourly = props.isHourly;

	if( props.searchResults ) {
		if ( isHourly ) {
			return <WxHourlyDisplay 
						searchResults={props.searchResults} 
						isHourly={props.isHourly}/>;
		}
		return <WxCurrentDisplay 
					searchResults={props.searchResults} 
					isHourly={props.isHourly}/>;
	}
	return <div></div>

}

const WxContainer =(props) => {

	const [stateSearchTerm, setStateSearchTerm] = useState({});
	const [stateHourlySearchTerm, setStateHourlySearchTerm] = useState({});

	const getSearchValue = (event) => {
		
    	setStateSearchTerm(event.currentTarget.value);
	}

	const getHourlySearchValue = (event) => {
		
    	setStateHourlySearchTerm(event.currentTarget.value);
	}

	return (
		<div>
			<ZipSearch
			    stylePadding={'pad-right-10'}
				title = 'Search Weather'
				changeSearchVal={getSearchValue} 
				searchForWx={ ()=>props.searchWx(stateSearchTerm) }/>
			<ZipSearch
			    stylePadding={'pad-right-1'}
			    title = '5 Day 3 Hour Forcast'
				changeSearchVal={getHourlySearchValue} 
				searchForWx={ ()=>props.searchHourlyWx(stateHourlySearchTerm) }/>
			<Display 
				isHourly={props.isHourly}
				searchResults={props.searchResults}	/>
		</div>
	);
}


const mapDispatchToProps = (dispatch, ownProps) => { 
	console.log("ownProps: "+ownProps);
	return {
		
		searchWx: (st) => {
			if ( st ) {
				 dispatch(searchWx(st));
			}
		},
		searchHourlyWx: (st) => {
			if ( st ) {
				dispatch(searchHourlyWx(st));
			}
		}
	} 

}


//used for selecting the part of the data 
//from the store that the connected component needs
//If component is slow make sure you arent doing expensive things here
const mapStateToProps = (state) => ({
  searchVal: state.searchwx.searchWxTerm,
  searchResults: state.searchwx.searchResults,
  isHourly: state.searchwx.searchHourly
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WxContainer);