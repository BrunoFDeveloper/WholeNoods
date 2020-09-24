import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ComposePost from './components/ComposePost';
import Home from './components/Home';
import Layout from './components/Layout';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Messages from './components/Messages';
import { Provider } from './models';
import environment from './utils/environment';

export default function App() {
	return (
		<Provider>
			<RelayEnvironmentProvider environment={environment}>
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
								<ComposePost />
							</Route>
						</Routes>
					</Layout>
				</BrowserRouter>
			</RelayEnvironmentProvider>
		</Provider>
	);
}
