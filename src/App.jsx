import Login from './pages/Login';
import Chat from './pages/Chat';
import { useAuthContext } from './context/AuthContext';

function App() {
	const { user } = useAuthContext();

	return (
		<main className="bg-slate-800 text-slate-200">
			{user ? <Chat /> : <Login />}
		</main>
	);
}

export default App;
