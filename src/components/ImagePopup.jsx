import { useChatContext } from '../context/ChatContext';
import { ImCancelCircle } from 'react-icons/im';

const ImagePopup = () => {
	const { fileURL, setFileURL, setInputMessage } = useChatContext();

	const handleDelete = () => {
		setFileURL('');
		setInputMessage('');
	};

	return (
		<div className="max-w-sm h-64 rounded-lg mx-auto px-4 relative  bg-slate-400 flex justify-center items-center">
			<div>
				<ImCancelCircle
					size={30}
					className="absolute top-2 right-2 text-red-500  cursor-pointer"
					onClick={handleDelete}
				/>
				<img
					src={fileURL}
					alt="imagen subida"
					className="max-w-[250px] max-h-[180px] mx-auto"
				/>
			</div>
		</div>
	);
};

export default ImagePopup;
