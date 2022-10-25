import { useAuthContext } from '../context/AuthContext';
import { IoIosExit, IoMdChatboxes } from 'react-icons/io';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import SelectChannel from './SelectChannel';

const Header = () => {
	const { user } = useAuthContext();

	return (
		<header className="bg-slate-700 h-20 flex items-center justify-between px-4 text-white">
			<IoMdChatboxes size={45} color={'#06B6D4'} />
			<nav>
				<ul className="flex items-center gap-3">
					<li>
						<SelectChannel />
					</li>

					<li>
						<Link
							to="/create-channel"
							className="bg-cyan-500 text-white px-3 py-1 font-medium rounded-lg"
						>
							Crear Canal
						</Link>
					</li>
					<li>
						<button
							className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded-lg text-center font-medium"
							onClick={() => auth.signOut()}
						>
							<IoIosExit size={25} />
							Salir
						</button>
					</li>
					<li>
						<img
							src={user.photoURL}
							alt={user.displayName}
							className="w-12 aspect-square rounded-full"
						/>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
