import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, AmplifyAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<AmplifySignOut />
				<button OnClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
					Sign in With Facebook
				</button>
				<h2>My App Content</h2>
			</header>
		</div>
	);
}

export default App;
