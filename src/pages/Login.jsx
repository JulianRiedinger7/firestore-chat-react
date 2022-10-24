import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Login = () => {
	const login = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center space-y-4">
			<h1 className="text-2xl font-semibold">Ingresa para poder ver el chat</h1>
			<button
				className="bg-cyan-500 text-white flex items-center gap-1 px-4 py-2 rounded-lg text-lg font-medium"
				onClick={login}
			>
				<FcGoogle />
				Ingresar con Google
			</button>
		</div>
	);
};

export default Login;
