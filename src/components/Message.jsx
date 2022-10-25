import { useEffect, useRef } from 'react';

const Message = ({ username, avatar, timestamp, message }) => {
	const msgRef = useRef();

	useEffect(() => {
		msgRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
	}, []);

	return (
		<div className="shadow-xl flex flex-col p-4" ref={msgRef}>
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={username}
					className="w-10 aspect-square rounded-full"
				/>
				<div className="max-w-7xl">
					<h3 className="font-medium">{username}</h3>
					<p className="">{message}</p>
				</div>
			</div>
			<p className="self-end text-sm italic font-medium">{timestamp}</p>
		</div>
	);
};

export default Message;
