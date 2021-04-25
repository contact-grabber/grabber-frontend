import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from './Grid';
import Card from 'react-bootstrap/Card';

const Results = ({
	state,
	setState,
	route,
	setLastSearch,
	search,
	refresh,
}) => {
	const getJobs = () => {
		setState('');
		axios
			.get(
				`https://gjgml13loc.execute-api.us-west-2.amazonaws.com/staging/${route}?search=${search.job}&state=${search.location}`
			)
			.then((res) => {
				setState(res);
				setLastSearch(search.job);
			});
	};

	useEffect(() => {
		getJobs();
		//Putting refresh here so that when it is called manually it will rerender and get the new state for the searching.
	}, [refresh]);
	return (
		<Grid>
			{state
				? state.data.jobs.map((job) => {
						return (
							<Card style={{ width: '15rem' }} key={job.company}>
								<Card.Body>
									<Card.Title>{job.title}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										{job.company}
									</Card.Subtitle>
									<Card.Text>{job.summary}</Card.Text>
								</Card.Body>
							</Card>
						);
				  })
				: 'loading'}
		</Grid>
	);
};

export default Results;
