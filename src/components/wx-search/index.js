import React from 'react';
import '../../static/css/wx.css';

export const ZipSearch  = (props) => {
		
	return (
		<div className="display wx-search">			
			
			<div >
			<div className={ props.stylePadding + " display-inline"}>{props.title}: </div>
				<input
					name="searchBox"
					type="text"
					className="formControl"
					onChange={props.changeSearchVal} 
				/>
				<button
					name="searchButton"
					className="btn btnPrimary"
					onClick={props.searchForWx}>
					Search
				</button>
			</div>
			
		</div>
	);
}



