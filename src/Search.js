import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import handleSubmit from './Results';

const Search = ({ search, setSearch }) => {
	const handleChange = (event) => {
		setSearch({ ...search, [event.target.id]: event.target.value });
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Row>
					<Col xs={7}>
						<Form.Control
							type='text'
							placeholder={search.job}
							onChange={handleChange}
							value={search.job}
						/>
					</Col>
					<Col>
						<Form.Control
							type='text'
							placeholder={search.location}
							onChange={handleChange}
							value={search.location}
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
