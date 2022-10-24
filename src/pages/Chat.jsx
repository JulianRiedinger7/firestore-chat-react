import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import ChatForm from '../components/ChatForm';
import Header from '../components/Header';
import Message from '../components/Message';

const Chat = () => {
	const { user } = useAuthContext();
	const [allMessages, setAllMessages] = useState([]);

	console.log(user);

	const getMessages = async () => {
		const msgRef = collection(db, 'mensajes');

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
	};

	useEffect(() => {
		getMessages();
	}, []);

	return (
		<div className="h-screen">
			<Header />
			<ul className="px-4 py-10 h-[calc(80vh)] overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-cyan-500 scrollbar-track-gray-900">
				{allMessages.map((message) => (
					<Message key={message.id} {...message} />
				))}
			</ul>
			<section className="fixed bottom-0">
				<ChatForm />
			</section>
		</div>
	);
};

export default Chat;
