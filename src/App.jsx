import Login from './pages/Login';
import Chat from './pages/Chat';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ChannelForm from './pages/ChannelForm';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';

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
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Header />
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
			<ToastContainer />
		</main>
	);
}

export default App;
