import React from 'react';
import Results from './Results';

const ResultBox = ({ lastSearch }) => {
	return (
		<div>
			<h1>Results Box</h1>
			<h3>Showing results for {lastSearch}</h3>
			<Results />
		</div>
	);
};

export default ResultBox;
