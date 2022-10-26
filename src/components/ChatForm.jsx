import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { useChannelContext } from '../context/ChannelContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatForm = () => {
	const [inputMessage, setInputMessage] = useState('');
	const { user } = useAuthContext();
	const { activeChannel, msgToEdit, changeMsgToEdit } = useChannelContext();

	const handleMessage = async (evt) => {
		evt.preventDefault();
		const msgValue = inputMessage;
		setInputMessage('');
		if (msgToEdit) {
			const msgRef = doc(
				db,
				`canales/${activeChannel}/mensajes/${msgToEdit.id}`
			);
			await updateDoc(msgRef, {
				...msgToEdit,
				message: msgValue,
			});
			toast.success('Mensaje editado correctmente!', {
				position: 'top-center',
				autoClose: 1500,
			});
			changeMsgToEdit('');
		} else {
			const date = Date.now();
			const msgRef = collection(db, `canales/${activeChannel}/mensajes`);
			await addDoc(msgRef, {
				username: user.displayName,
				uid: user.uid,
				avatar: user.photoURL,
				message: msgValue,
				timestamp: new Intl.DateTimeFormat('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				}).format(date),
			});
		}
	};

	useEffect(() => {
		if (msgToEdit) {
			setInputMessage(msgToEdit.message);
		}
	}, [msgToEdit]);

	return (
		<form onSubmit={handleMessage} className="flex w-screen px-4 pb-4">
			<input
				type="text"
				placeholder={`Escribe un mensaje en ${activeChannel} 😀`}
				className="bg-slate-700 p-1 py-2 text-white flex-1 w-full rounded-md"
				required
				value={inputMessage}
				onChange={(evt) => setInputMessage(evt.target.value)}
			/>
			<button
				type="submit"
				className="bg-cyan-500 text-white px-4 py-2 font-medium rounded-md"
			>
				{msgToEdit ? 'Editar' : 'Enviar'}
			</button>
		</form>
	);
};

export default ChatForm;
