import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const Search = ({ search, setSearch, setRefresh }) => {
	const handleChange = (event) => {
		setSearch({ ...search, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setRefresh({});
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Row>
					<Col xs={7}>
						<Form.Control
							type='text'
							required
							placeholder='Software Developer'
							onChange={handleChange}
							value={search.job}
							id='job'
						/>
					</Col>
					<Col>
						<Form.Control
							type='text'
							required
							placeholder='Nashville'
							onChange={handleChange}
							value={search.location}
							id='location'
						/>
					</Col>
					<Button variant='secondary' type='submit'>
						{' '}
						GO!
					</Button>
				</Form.Row>
			</Form>
		</div>
	);
};

export default Search;
