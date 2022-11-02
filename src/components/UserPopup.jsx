import { IoIosExit } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import { auth } from '../firebase/firebase';

function UserPopup() {
	const { setPopupUser } = useChatContext();
	const navigate = useNavigate();
	return (
		<div
			className="modal-container w-full h-full absolute top-0 z-10 flex justify-end bg-zinc-900 bg-opacity-30"
			onClick={() => {
				setPopupUser(false);
			}}
		>
			<div
				className="modal w-52 h-28 flex absolute top-20 flex-col items-center justify-center bg-opacity-50 bg-slate-300 dark:bg-gray-900 rounded-md "
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					className="w-fit px-4 py-2 mb-2 rounded-lg bg-cyan-500 font-medium hover:opacity-80 transition-all ease-in-out"
					onClick={() => {
						setPopupUser(false);
						navigate('/create-channel');
					}}
				>
					Crear canal
				</button>
				<button
					className="w-28 flex items-center gap-2  bg-red-500 px-3 py-1 rounded-lg text-center font-medium hover:opacity-80 transition-all ease-in-out"
					onClick={() => {
						setPopupUser(false);
						auth.signOut();
					}}
				>
					<IoIosExit size={25} />
					Salir
				</button>
			</div>
		</div>
	);
}

export default UserPopup;
