import { createContext, useContext, useState } from 'react';

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

	return (
		<ChannelContext.Provider
			value={{
				activeChannel,
				changeActiveChannel,
				msgToEdit,
				changeMsgToEdit,
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
