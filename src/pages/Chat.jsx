import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import ChatForm from '../components/ChatForm';
import Message from '../components/Message';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';

const Chat = () => {
	const [allMessages, setAllMessages] = useState([]);
	const { activeChannel } = useChatContext();

	const getMessages = async () => {
		if (activeChannel) {
			const msgRef = collection(db, `canales/${activeChannel}/mensajes`);

			const q = query(msgRef, orderBy('timestamp', 'asc'));

			const unsub = onSnapshot(q, (snap) => {
				setAllMessages(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
				);
			});

			return unsub;
		}
	};

	useEffect(() => {
		getMessages();
	}, [activeChannel]);

	if (!activeChannel)
		return (
			<div className="h-[calc(100vh-80px)] flex justify-center items-center">
				<h2 className="text-lg md:text-xl font-medium space-x-2">
					<span>Selecciona o</span>
					<Link
						to="/dashboard"
						className="text-cyan-500 hover:text-cyan-700 transition-all ease-in-out"
					>
						crea
					</Link>
					<span>un canal para comenzar a chatear</span>
				</h2>
			</div>
		);

	return (
		<div className="h-[calc(100vh-80px)]">
			{allMessages.length === 0 ? (
				<div className="h-[calc(100vh-80px)] flex items-center justify-center">
					<HashLoader size={100} color={'#36d7b7'} />
				</div>
			) : (
				<>
					<ul className="px-4 pt-5 h-[calc(80vh)] overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-cyan-500 dark:scrollbar-track-gray-900 scrollbar-track-gray-200">
						{allMessages.map((message) => (
							<Message key={message.id} {...message} />
						))}
					</ul>
				</>
			)}
			{activeChannel && (
				<section className="fixed bottom-0">
					<ChatForm />
				</section>
			)}
		</div>
	);
};

export default Chat;
