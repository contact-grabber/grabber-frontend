import React, { useState } from 'react';
import Results from './Results';

const ResultBox = ({ lastSearch, setLastSearch, search, refresh }) => {
	const [jobs, setJobs] = useState();
	const [monster, setMonster] = useState();

	return (
		<div>
			<h3>Showing results for {lastSearch}</h3>
			<div className='results'>
				<Results
					state={jobs}
					setState={setJobs}
					route='jobs'
					setLastSearch={setLastSearch}
					search={search}
					refresh={refresh}
				/>
			</div>
			<div className='results'>
				<Results
					state={monster}
					setState={setMonster}
					route='monster'
					setLastSearch={setLastSearch}
					search={search}
					refresh={refresh}
				/>
			</div>
		</div>
	);
};

export default ResultBox;
