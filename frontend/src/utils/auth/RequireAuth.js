import React from 'react';
//import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';

export const RequireAuth = ({ children }) => {
	const { authed } = useAuth();
	// const location = useLocation();

	// return authed === true ? (
	// 	children
	// ) : (
	// 	<Navigate to='/' replace state={{ path: location.pathname }} />
	// );
	return (
		<>
			{/* If app is loaded, we are passing the user and isAuthenticated values as a global state */}
			{authed ? (
				children
			) : (
				<div>
					<h1>Not authenticated.</h1>
				</div>
			)}
		</>
	);
};
