import { createContext, useContext, useState } from 'react';

const ChannelContext = createContext();

export const ChannelContextProvider = ({ children }) => {
	const [activeChannel, setActiveChannel] = useState('');

	const changeActiveChannel = (channel) => {
		setActiveChannel(channel);
	};

	return (
		<ChannelContext.Provider
			value={{
				activeChannel,
				changeActiveChannel,
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
