import Login from './pages/Login';
import Chat from './pages/Chat';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ChannelForm from './pages/ChannelForm';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<main className=" dark:bg-slate-800 dark:text-slate-200 bg-gray-100 transition-all ease-in-out">
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
			<ToastContainer />
		</main>
	);
}

export default App;
