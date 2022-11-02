import { useChatContext } from '../context/ChatContext';
import { ImCancelCircle } from 'react-icons/im';

const ImagePopup = () => {
	const { fileURL, setFileURL, setInputMessage } = useChatContext();

	const handleDelete = () => {
		setFileURL('');
		setInputMessage('');
	};

	return (
		<div className="max-w-sm h-64 rounded-lg mx-auto px-4  bg-slate-400 flex justify-center items-center">
			<div className="relative">
				<ImCancelCircle
					size={30}
					className="absolute -right-4 text-red-500 -top-8 cursor-pointer"
					onClick={handleDelete}
				/>
				<img
					src={fileURL}
					alt="imagen subida"
					className="max-w-[250px] mx-auto"
				/>
			</div>
		</div>
	);
};

export default ImagePopup;
