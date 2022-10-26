import { addDoc, collection } from 'firebase/firestore';
import { useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { useChannelContext } from '../context/ChannelContext';

const ChatForm = () => {
	const inputRef = useRef();
	const { user } = useAuthContext();
	const { activeChannel } = useChannelContext();

	const handleMessage = async (evt) => {
		evt.preventDefault();
		const date = Date.now();
		const msgRef = collection(db, `canales/${activeChannel}/mensajes`);
		const msgValue = inputRef.current.value;
		inputRef.current.value = '';
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
	};

	return (
		<form onSubmit={handleMessage} className="flex w-screen px-4 pb-4">
			<input
				type="text"
				placeholder={`Escribe un mensaje en ${activeChannel} 😀`}
				className="bg-slate-700 p-1 py-2 text-white flex-1 w-full rounded-md"
				required
				ref={inputRef}
			/>
			<button
				type="submit"
				className="bg-cyan-500 text-white px-4 py-2 font-medium rounded-md"
			>
				Enviar
			</button>
		</form>
	);
};

export default ChatForm;
