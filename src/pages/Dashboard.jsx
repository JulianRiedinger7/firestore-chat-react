import { auth } from '../firebase/firebase';
import { IoIosExit } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="h-[calc(100vh-80px)] flex gap-20 justify-center items-center">
			<button onClick={() => navigate(-1)} className="fixed top-24 left-5">
				Volver
			</button>
			<Link
				to="/create-channel"
				className="bg-cyan-500 text-white px-3 py-1 font-medium rounded-lg"
			>
				Crear Canal
			</Link>
			<button
				className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-lg text-center font-medium"
				onClick={() => auth.signOut()}
			>
				<IoIosExit size={25} />
				Salir
			</button>
		</div>
	);
};

export default Dashboard;
