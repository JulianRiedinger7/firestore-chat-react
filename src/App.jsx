import Login from './pages/Login';
import Chat from './pages/Chat';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ChannelForm from './pages/ChannelForm';
import Header from './components/Header';

function App() {
	return (
		<main className="bg-slate-800 text-slate-200">
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Header />
							<Chat />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route
					path="/create-channel"
					element={
						<ProtectedRoute>
							<Header />
							<ChannelForm />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
