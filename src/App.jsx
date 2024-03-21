import React, {Suspense} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import ScannerIdCard from './pages/ScannerIdCard';
import AbsenIdCard from './pages/AbsenIdCard';
import Login from './pages/Login';
import PrivateRoute from './security/PrivateRoute';
import './index.css';
import PageNotFound from "./components/PageNotFound.jsx";
import LoadinMountComponent from "./components/LoadinMountComponent.jsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <PrivateRoute>
                    <Suspense fallback={<LoadinMountComponent/>}>
                        <ScannerIdCard />
                    </Suspense>
                </PrivateRoute>
            )
        },
        {
            path: '/absen/:id',
            element: (
                <PrivateRoute>
                    <Suspense fallback={<LoadinMountComponent/>}>
                        <AbsenIdCard/>
                    </Suspense>
                </PrivateRoute>
            )
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<LoadinMountComponent/>}>
                    <Login/>
                </Suspense>
            )
        },
        {
            path: '*',
            element: <PageNotFound/>
        }
    ])
    return (
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );
};

export default App;
