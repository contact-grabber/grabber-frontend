import React, { useState } from 'react';
import Results from './Results';

const ResultBox = ({ lastSearch, setLastSearch, search }) => {
	const [jobs, setJobs] = useState();
	const [monster, setMonster] = useState();

	return (
		<div>
			<h1>Results Box</h1>
			<h3>Showing results for {lastSearch}</h3>
			<div className='results'>
				<Results
					state={jobs}
					setState={setJobs}
					route='jobs'
					setLastSearch={lastSearch}
					search={search}
				/>
			</div>
			<div className='results'>
				<Results
					state={monster}
					setState={setMonster}
					route='monster'
					setLastSearch={lastSearch}
					search={search}
				/>
			</div>
		</div>
	);
};

export default ResultBox;
