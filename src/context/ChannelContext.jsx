import { createContext, useContext, useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const ChannelContext = createContext();

export const ChannelContextProvider = ({ children }) => {
	const [activeChannel, setActiveChannel] = useState('');
	const [msgToEdit, setMsgToEdit] = useState('');

	const changeActiveChannel = (channel) => {
		setActiveChannel(channel);
	};

	const changeMsgToEdit = (msg) => {
		setMsgToEdit(msg);
	};

	const uploadFile = async (file) => {
		const storageRef = ref(storage, `imagenes/${v4()}`);
		await uploadBytes(storageRef, file);
		return getDownloadURL(storageRef);
	};

	return (
		<ChannelContext.Provider
			value={{
				activeChannel,
				changeActiveChannel,
				msgToEdit,
				changeMsgToEdit,
				uploadFile,
			}}
		>
			{children}
		</ChannelContext.Provider>
	);
};

export const useChannelContext = () => {
	const context = useContext(ChannelContext);

	if (!context)
		throw new Error('useChannelContext must be used within an ChannelProvider');

	return context;
};
