import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../contexto/AuthContext';

import AuthLayout from '../paginas/_layouts/auth';
import DefaultLayout from '../paginas/_layouts/default';

interface RouteProps extends ReactDOMRouteProps {
	isPrivate?: boolean;
	component: React.ComponentType;
}

const Rota: React.FC<RouteProps> = ({ component: Component, isPrivate = false, ...rest }) => {
	const { user } = useAuth();

    if (!user && isPrivate) {
        return <Redirect to="/" />;
    }
    
    if (user && !isPrivate) {
        if (user.userName == "admin") {
            return <Redirect to="/admin" />;
        } else {
            return <Redirect to="/client" />;
        }
    }

    const Layout = user ? DefaultLayout : AuthLayout;

	return (
	    <ReactDOMRoute 
            { ...rest }
            
            render={props => (
                <Layout>
                    <Component />
                </Layout>
            )}
        />
	);
};

export default Rota;
