import React from 'react';
import { useRoutes } from 'react-router-dom';
import Listing from './Listing';
import Profile from './Profile';

const App: React.FC = () => {
    const routes = [
        { path: '/', element: <Listing /> },
        { path: '/profile', element: <Profile /> }
    ];

    const element = useRoutes(routes);

    return <>{element}</>;
};

export default App;
