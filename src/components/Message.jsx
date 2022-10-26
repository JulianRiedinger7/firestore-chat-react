import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

const Message = ({ username, avatar, timestamp, message, uid }) => {
	const msgRef = useRef();
	const { user } = useAuthContext();

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
				<div className="max-w-7xl flex justify-between items-center flex-1">
					<h3 className="font-medium">{username}</h3>
					{user.uid === uid && (
						<div className="flex gap-5">
							<AiFillEdit
								size={20}
								className="cursor-pointer hover:text-cyan-500 transition-all ease-in-out"
							/>
							<AiFillDelete
								size={20}
								className="cursor-pointer hover:text-cyan-500 transition-all ease-in-out"
							/>
						</div>
					)}
				</div>
			</div>
			<p className="pt-3">{message}</p>
			<p className="self-end text-sm italic font-medium">{timestamp}</p>
		</div>
	);
};

export default Message;
