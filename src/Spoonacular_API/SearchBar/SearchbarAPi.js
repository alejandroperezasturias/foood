import React, { useState } from 'react';
import './searcbarAPI.scss';
import FilterSearchAPI from './FilterSearchAPI';
import SortsearchAPI from './sortsearchAPI.js';

export default function SearcharAPI({ handleApiCall, handleApiSearch }) {
	const [filterInView, setFilterInView] = useState(false);
	const [sortInView, setsortInView] = useState(false);
	function handleFilterInView() {
		setFilterInView(!filterInView);
	}
	function handleSortInView() {
		setsortInView(!sortInView);
		console.log('Hi');
	}

	return (
		<div>
			<div className={'SearchbarAPI__Wrapper'}>
				<input
					onChange={(e) => handleApiSearch(e.target.value)}
					className={'SearchbarAPI__Main-Input'}
					type="text"
				></input>
				<div className={'SearchbarAPI__Main-btn_wrapper'}>
					<button
						onClick={handleFilterInView}
						className={'SearchbarAPI__Filter-btn'}
					>
						<i className="fas fa-sliders-h"></i>
						<span>Filter</span>
					</button>
				</div>
				<div className={'SearchbarAPI__Main-btn_wrapper'}>
					<button
						onClick={handleSortInView}
						className={'SearchbarAPI__Sort-btn'}
					>
						<i className="fas fa-random"></i>
						<span>Sort</span>
					</button>
				</div>
				<div className={'SearchbarAPI__Main-btn_wraprer_search'}>
					<button onClick={handleApiCall} className={'SearchbarAPI__Main-btn'}>
						Search
					</button>
				</div>
			</div>
			<FilterSearchAPI filterInView={filterInView} />
			<SortsearchAPI sortInView={sortInView} />
		</div>
	);
}
