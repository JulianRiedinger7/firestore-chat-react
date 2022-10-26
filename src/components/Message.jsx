import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useChannelContext } from '../context/ChannelContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = ({ username, avatar, timestamp, message, uid, id, edited }) => {
	const msgRef = useRef();
	const { user } = useAuthContext();
	const { activeChannel, changeMsgToEdit } = useChannelContext();

	useEffect(() => {
		msgRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, []);

	const handleDelete = async () => {
		const docRef = doc(db, `canales/${activeChannel}/mensajes/${id}`);
		toast.success('Mensaje eliminado correctamente!', {
			position: 'top-center',
			autoClose: 1500,
		});
		await deleteDoc(docRef);
	};

	const handleEdit = async () => {
		const docRef = doc(db, `canales/${activeChannel}/mensajes/${id}`);
		const msg = await getDoc(docRef);
		changeMsgToEdit({
			...msg.data(),
			id,
		});
	};

	return (
		<div className="shadow-xl flex flex-col p-4" ref={msgRef}>
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={username}
					className="w-10 aspect-square rounded-full"
				/>
				<div className="max-w-7xl flex justify-between items-center flex-1">
					<h3 className="font-medium">{username}</h3>
					{user.uid === uid && (
						<div className="flex gap-5">
							<AiFillEdit
								size={20}
								className="cursor-pointer hover:text-cyan-500 transition-all ease-in-out"
								onClick={handleEdit}
							/>
							<AiFillDelete
								size={20}
								className="cursor-pointer hover:text-cyan-500 transition-all ease-in-out"
								onClick={handleDelete}
							/>
						</div>
					)}
				</div>
			</div>
			<p className="pt-3">
				{message}
				<span className="italic text-xs">{edited ? ' (editado)' : ''}</span>
			</p>
			<p className="self-end text-sm italic font-medium">{timestamp}</p>
		</div>
	);
};

export default Message;
