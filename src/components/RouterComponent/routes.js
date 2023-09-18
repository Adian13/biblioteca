import React, { Children } from 'react';
import Registration from '../../pages/Registration/Registration'
import Login from '../../pages/Login/Login';
import HomePage from '../../pages/home';
import ErrorPage from '../../pages/ErrorPage'
import Biblioteche from '../../pages/Biblioteche/Biblioteche';
import Esperti from '../../pages/Esperti/Esperti';
import ClubList from '../../pages/ClubList/ClubList';
import BookList from '../../pages/BookList/BookList';
import AreaUtenteBiblioteca from '../../pages/AreaUtente/AreaUtenteBiblioteca';
import AreaUtenteEsperto from '../../pages/AreaUtente/AreaUtenteEsperto';
import AreaUtenteLettore from '../../pages/AreaUtente/AreaUtenteLettore';
import Club from '../../pages/Club/Club';
import InserimentoLibri from '../../pages/InserimentoLibri/InserimentoLibri';
import RichiestePage from '../../pages/Richieste/RichiestePage';
import RichiesteLettorePage from '../../pages/Richieste/RichiesteLettorePage';
import PostPage from '../../pages/Post/PostPage';
import CommentiPage from '../../pages/Post/CommentiPage';

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
        element: <ClubList lettore="false" esperto="false"/>,
    },
    {
        path: '/clubDelLibro/lettore',
        element: <ClubList lettore="true" esperto="false"/>,
    },
    {
        path: '/clubDelLibro/esperto',
        element: <ClubList lettore="false" esperto="true"/>,
    },
    {
        path: '/clubDelLibro/:id/info',
        element: <Club/>
    },
    {
        path: '/clubDelLibro/:id',
        element: <PostPage/>
    },
    {
        path: '/clubDelLibro/:id/:idPost',
        element: <CommentiPage/>
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
        path: '/areaUtente/Biblioteca',
        element: <AreaUtenteBiblioteca/>
    },
    {
        path: '/areaUtente/Biblioteca/richieste',
        element: <RichiestePage/>
    },
    {
        path: '/areaUtente/Esperto',
        element: <AreaUtenteEsperto/>
    },
    {
        path: '/areaUtente/Lettore',
        element: <AreaUtenteLettore/>
    },
    {
        path: '/areaUtente/Lettore/richieste',
        element: <RichiesteLettorePage/>
    },
    
    {
        path: '*',
        element: <ErrorPage/>
    }

]