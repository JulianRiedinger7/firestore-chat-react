import { useAuthContext } from '../context/AuthContext';
import { HashLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuthContext();

	if (loading) return <HashLoader />;
	if (!user) return <Navigate to="/login" />;

	return <>{children}</>;
};

export default ProtectedRoute;
