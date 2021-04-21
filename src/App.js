/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
import ResultBox from './ResultBox';
import Search from './Search';
import { Navbar, Button } from 'react-bootstrap';

Amplify.configure(awsconfig);

const App = () => {
	const [user, setUser] = useState(null);
	const [searchString, setSearchString] = useState('Software Developer');
	const [lastSearch, setLastSearch] = useState(searchString);
	const [indeed, setIndeed] = useState(null);
	const [monster, setMoster] = useState(null);

	useEffect(() => {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
				case 'cognitoHostedUI':
					getUser().then((userData) => setUser(userData));
					break;
				case 'signOut':
					setUser(null);
					break;
				case 'signIn_failure':
				case 'cognitoHostedUI_failure':
					console.log('Sign in failure', data);
					break;
			}
		});

		getUser().then((userData) => setUser(userData));
	}, []);

	const getUser = () => {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log('Not signed in'));
	};
	const handleChange = (event) => {
		setSearchString(event.target.value);
	};

	return (
		<div>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand href='/'>Job Finder</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className='justify-content-end'>
					<Navbar.Text>
						Signed in as:{` ${user ? user.attributes.email : ' '}  `}
						{user ? (
							<Button variant='secondary' onClick={() => Auth.signOut()}>
								Sign Out
							</Button>
						) : (
							<Button
								variant='secondary'
								onClick={() => Auth.federatedSignIn()}>
								Sign In
							</Button>
						)}
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
			<div>
				<Search
					searchString={searchString}
					onChange={handleChange}
					value={searchString}
				/>
				<ResultBox lastSearch={lastSearch} />
			</div>
		</div>
	);
};

export default App;
