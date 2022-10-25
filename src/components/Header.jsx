import { useAuthContext } from '../context/AuthContext';
import { IoIosExit } from 'react-icons/io';
import { auth } from '../firebase/firebase';

const Header = () => {
	const { user } = useAuthContext();

	return (
		<header className="bg-slate-700 h-20 flex items-center justify-between px-4 text-white">
			<span className="text-4xl">❄</span>
			<nav>
				<ul className="flex items-center gap-3">
					<li>
						<button className="bg-cyan-500 text-white px-3 py-1 font-medium rounded-lg">
							Crear Canal
						</button>
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
