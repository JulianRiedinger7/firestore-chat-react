import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuthContext } from '../context/AuthContext';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChannelForm = () => {
	const navigate = useNavigate();
	const nameRef = useRef();
	const { user } = useAuthContext();

	const handleChannel = async (evt) => {
		evt.preventDefault();
		const channelName = nameRef.current.value;
		nameRef.current.value = '';
		const channelRef = doc(db, `canales/${channelName}`);
		toast.success(`Canal ${channelName} creado correctamente!`, {
			position: 'top-center',
			autoClose: 1500,
		});
		await setDoc(channelRef, {
			id: `canal-${v4()}`,
			nombre: channelName,
			user: user.displayName,
			user_id: user.uid,
		});
		return navigate(-1);
	};

	return (
		<div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center">
			<button
				className="fixed top-24 left-5 px-4 py-2 rounded-lg bg-cyan-500 font-medium"
				onClick={() => navigate(-1)}
			>
				Volver
			</button>

			<form
				className="mt-20 flex flex-col items-center justify-center space-y-4"
				onSubmit={handleChannel}
			>
				<label htmlFor="nombre" className="text-xl">
					Elige un nombre para tu canal:
				</label>
				<input
					type="text"
					placeholder="Nombre..."
					className="dark:bg-slate-700 bg-slate-300 p-1 py-2 text-white flex-1 w-72 md:w-80 lg:w-96 rounded-md"
					required
					ref={nameRef}
				/>
				<button
					type="submit"
					className="bg-cyan-500 text-white px-10 py-2 font-medium rounded-md"
				>
					Crear
				</button>
			</form>
		</div>
	);
};

export default ChannelForm;
