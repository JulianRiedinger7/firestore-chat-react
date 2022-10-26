import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { useChannelContext } from '../context/ChannelContext';

const SelectChannel = () => {
	const [allChannels, setAllChannels] = useState([]);
	const { changeActiveChannel } = useChannelContext();

	const getChannels = () => {
		const channelsRef = collection(db, 'canales');
		const unsub = onSnapshot(channelsRef, (snap) => {
			setAllChannels(
				snap.docs.map((doc) => ({
					...doc.data(),
				}))
			);
		});

		return unsub;
	};

	const handleChange = (evt) => {
		changeActiveChannel(evt.target.value);
	};

	useEffect(() => {
		getChannels();
	}, []);

	return (
		<select className="w-26 text-black font-medium" onChange={handleChange}>
			<option value="">Selecciona un canal</option>
			{allChannels.map((channel) => (
				<option key={channel.id} value={channel.nombre}>
					{channel.nombre}
				</option>
			))}
		</select>
	);
};

export default SelectChannel;
