import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { useChatContext } from '../context/ChatContext';
import { toast } from 'react-toastify';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import EmojiPicker from 'emoji-picker-react';

const ChatForm = () => {
	const [inputMessage, setInputMessage] = useState('');
	const [showPicker, setShowPicker] = useState(false);
	const [fileURL, setFileURL] = useState('');
	const { user } = useAuthContext();
	const { activeChannel, msgToEdit, changeMsgToEdit, uploadFile } =
		useChatContext();

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
				edited: true,
			});
			toast.success('Mensaje editado correctmente!', {
				position: 'top-center',
				autoClose: 1500,
			});
			changeMsgToEdit('');
		} else {
			const date = Date.now();
			const msgRef = collection(db, `canales/${activeChannel}/mensajes`);
			const imgURL = fileURL;
			setFileURL('');
			await addDoc(msgRef, {
				username: user.displayName,
				uid: user.uid,
				avatar: user.photoURL,
				message: msgValue,
				file: imgURL,
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

	const handleFileChange = async (evt) => {
		setInputMessage('');
		setFileURL('');
		if (!evt.target.files[0].type.includes('image')) {
			evt.target.value = null;
			return toast.error('Solo puedes subir imagenes!', {
				position: 'top-center',
				autoClose: 2500,
			});
		}
		try {
			const result = await uploadFile(evt.target.files[0]);
			setFileURL(result);
			setInputMessage(evt.target.files[0].name);
			evt.target.value = null;
		} catch (error) {
			toast.error('Ha ocurrido un error, intentalo mas tarde', {
				position: 'top-center',
				autoClose: 2500,
			});
		}
	};

	useEffect(() => {
		if (msgToEdit) {
			setInputMessage(msgToEdit.message);
		}
	}, [msgToEdit]);

	const addEmoji = (code) => {
		const emoji = String.fromCodePoint(`0x${code.unified}`);
		setInputMessage((prevInputMessage) => prevInputMessage + ` ${emoji}`);
	};

	return (
		<>
			{showPicker && (
				<div className="absolute right-10 bottom-20">
					<EmojiPicker height={350} width={300} onEmojiClick={addEmoji} />
				</div>
			)}
			<form
				onSubmit={handleMessage}
				className="flex items-center w-screen px-4 pb-4"
			>
				<input
					type="text"
					placeholder={`Escribe un mensaje en ${activeChannel} 😀`}
					className="dark:bg-slate-700 p-1 py-2 pl-10 dark:text-white dark:placeholder:text-slate-400 bg-slate-300 flex-1 w-full rounded-md placeholder:text-xs md:placeholder:text-sm xl:placeholder:text-lg placeholder:text-slate-800 placeholder:font-medium"
					required
					value={inputMessage}
					onChange={(evt) => setInputMessage(evt.target.value)}
				/>
				<div className="bg-gray-500 w-6 h-6 rounded-full absolute left-5 cursor-pointer">
					<p className="text-2xl font-bold w-full absolute flex justify-center leading-5 cursor-pointer ">
						+
					</p>
					<input
						type="file"
						className="bg-gray-500 w-full rounded-full absolute left-0 top-0 bottom-0 right-0 opacity-0 cursor-pointer"
						onChange={handleFileChange}
					/>
				</div>

				<MdOutlineEmojiEmotions
					className="cursor-pointer"
					size={30}
					onClick={() => setShowPicker(!showPicker)}
				/>

				<button
					type="submit"
					className="bg-cyan-500 text-white px-4 py-2 font-medium rounded-md"
				>
					{msgToEdit ? 'Editar' : 'Enviar'}
				</button>
			</form>
		</>
	);
};

export default ChatForm;
