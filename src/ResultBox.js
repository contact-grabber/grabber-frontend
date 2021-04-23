import React, { useState } from 'react';
import Results from './Results';

const ResultBox = ({ lastSearch }) => {
	const [jobs, setJobs] = useState();
	const [monster, setMonster] = useState();

	return (
		<div>
			<h1>Results Box</h1>
			<h3>Showing results for {lastSearch}</h3>
			<Results state={jobs} setState={setJobs} route='jobs' />
			<Results state={monster} setState={setMonster} route='monster' />
		</div>
	);
};

export default ResultBox;
