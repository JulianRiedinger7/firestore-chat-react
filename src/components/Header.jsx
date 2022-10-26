import { useAuthContext } from '../context/AuthContext';
import { IoMdChatboxes } from 'react-icons/io';
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
						<Link to="/dashboard">
							<img
								src={user.photoURL}
								alt={user.displayName}
								className="w-12 aspect-square rounded-full"
							/>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
