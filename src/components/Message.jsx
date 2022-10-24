const Message = ({ username, avatar, timestamp, message }) => {
	return (
		<div className="shadow-xl flex flex-col p-4 ">
			<div className="flex items-center gap-2">
				<img
					src={avatar}
					alt={username}
					className="w-10 aspect-square rounded-full"
				/>
				<div>
					<h3 className="font-medium">{username}</h3>
					<p className="">{message}</p>
				</div>
			</div>
			<p className="self-end text-sm italic font-medium">{timestamp}</p>
		</div>
	);
};

export default Message;
