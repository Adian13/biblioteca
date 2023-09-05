import React, { Children } from 'react';
import Registration from '../../pages/Registration/Registration'
import Login from '../../pages/Login/Login';
import HomePage from '../../pages/home';
import ErrorPage from '../../pages/ErrorPage'
import Biblioteche from '../../pages/Biblioteche/Biblioteche';
import Esperti from '../../pages/Esperti/Esperti';
import ClubList from '../../pages/ClubList/ClubList';
import BookList from '../../pages/BookList/BookList';
import AreaUtente from '../../pages/AreaUtente/AreaUtente';
import Club from '../../pages/Club/Club';
import InserimentoLibri from '../../pages/InserimentoLibri/InserimentoLibri';

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
        path: '/clubDelLibro',
        element: <ClubList/>,
    },
    {
        path: '/clubDelLibro/:id',
        element: <Club/>
    },
    {
        path: '/bookList',
        element: <BookList/>,
        children:[
        {
            path: ':biblioteca',
            element: <BookList/>
        }
        ]
    },
    {
        path: '/InserimentoLibro',
        element: <InserimentoLibri/>
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