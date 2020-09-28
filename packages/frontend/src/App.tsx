import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Layout from './components/Layout';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Messages from './components/Messages';
import { Provider, rootStore } from './models';
import { createEnvironment } from './utils/environment';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { Environment } from 'react-relay';

// NOTE: I use rootStore and not useMst because the root store is not yet provided.
export default observer(() => {
	const [prevIsSignedIn, setPrevIsSignedIn] = useState(
		rootStore.user.isSignedIn,
	);
	const environmentRef = useRef<Environment>();

	useEffect(() => {
		setPrevIsSignedIn(rootStore.user.isSignedIn);
	}, [rootStore.user.isSignedIn]);

	if (
		// If we do not have an environment...
		!environmentRef.current ||
		// Or if the user state has changed (signed in or signed out)...
		rootStore.user.isSignedIn !== prevIsSignedIn
	) {
		environmentRef.current = createEnvironment();
	}

	return (
		<Provider>
			<RelayEnvironmentProvider environment={environmentRef.current}>
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path="/">
								<Home />
							</Route>
							<Route path="/signin">
								<SignIn />
							</Route>
							<Route path="/signup">
								<SignUp />
							</Route>
							<Route path="/profiles/:username">
								<Profile />
							</Route>
							<Route path="/messages/*" element={<Messages />} />
							<Route path="/posts/create">
								<CreatePost />
							</Route>
						</Routes>
					</Layout>
				</BrowserRouter>
			</RelayEnvironmentProvider>
		</Provider>
	);
});
