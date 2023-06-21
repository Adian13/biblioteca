import React from 'react';
import Registration from '../../pages/Registration/Registration'
import Login from '../../pages/Login/Login';
import HomePage from '../../pages/home';
import ErrorPage from '../../pages/ErrorPage'
import Biblioteche from '../../pages/Biblioteche/Biblioteche';
import Esperti from '../../pages/Esperti/Esperti';
import ClubList from '../../pages/ClubList/ClubList';
import BookList from '../../pages/BookList/BookList';
import AreaUtente from '../../pages/AreaUtente/AreaUtente';

export const routes=[
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/registrazione',
        element: <Registration/>
    },
    {
        path: '/biblioteche',
        element: <Biblioteche/>
    },
    {
        path: '/esperti',
        element: <Esperti/>
    },
    {
        path: '/clubList',
        element: <ClubList/>
    },
    {
        path: '/bookList',
        element: <BookList/>
    },
    {
        path: '/areaUtente',
        element: <AreaUtente/>
    },
    {
        path: '*',
        element: <ErrorPage/>
    }

]