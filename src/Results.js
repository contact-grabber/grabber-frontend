import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from './Grid';
import Card from 'react-bootstrap/Card';

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
			<div>{state ? console.log(state) : 'loading'}</div>
		</Grid>
	);
};

export default Results;
