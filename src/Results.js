import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from './Grid';

const Results = ({ state, setState, route }) => {
	useEffect(() => {
		axios
			.get(
				`https://gjgml13loc.execute-api.us-west-2.amazonaws.com/staging/${route}`
			)
			.then((res) => {
				setState(res);
			});
	}, []);

	return (
		<Grid>
			<div>
				<p>I'm The Results!</p>
				{state ? console.log(state) : null}
				<p>{state ? state.data.titles[1] : 'Loading'}</p>
			</div>
		</Grid>
	);
};

export default Results;
