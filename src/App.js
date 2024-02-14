import React, {useState, useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';

import DispatchContext from './DispatchContext';
import StateContext from './StateContext';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import FlashMessages from './components/FlashMessages';
import Profile from './components/Profile';

Axios.defaults.baseURL = 'http://localhost:8080';

function App() {

  const initState = {
    loggedIn: Boolean(localStorage.getItem('complexAppToken')),
    flashMessages : [],
    user: {
      token: localStorage.getItem('complexAppToken'),
      username: localStorage.getItem('complexAppUsername'),
      avatar: localStorage.getItem('complexAppAvatar'),
    },
  };
  // Traditional way, non-immer
  // const ourReducer = (state, action) => {
  //   switch (action.type) {
  //     case 'logIn':
  //       return {
  //         ...state,
  //         loggedIn: true,
  //       };
  //     case 'logOut':
  //       return {
  //         ...state,
  //         loggedIn: false,
  //       };
  //     case 'flashMessage':
  //       return {
  //         ...state,
  //         flashMessages: state.flashMessages.concat(action.value)
  //       };
  //   }
  // }
 // const [state, dispatch] = useReducer(ourReducer, initState);
  
   const ourReducer = (draft, action) => {
    switch (action.type) {
      case 'logIn':
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case 'logOut':
        draft.loggedIn = false;
        return;
      case 'flashMessage':
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initState);

  useEffect( () => {
    if (state.loggedIn) {
      localStorage.setItem('complexAppToken', state.user.token);
      localStorage.setItem('complexAppUsername', state.user.username);
      localStorage.setItem('complexAppAvatar', state.user.avatar);
    } else {
      localStorage.removeItem('complexAppToken');
      localStorage.removeItem('complexAppUsername');
      localStorage.removeItem('complexAppAvatar'); 
    }
  }, [state.loggedIn]);

  // const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexAppToken')));
  // const [flashMessages, setFlashMessages] = useState([]);

  // const addFlashMessage = (message) => {
  //   setFlashMessages( prev =>  prev.concat(message));
  // }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <FlashMessages messages={state.flashMessages}/>
          <Routes>
          <Route path='/create-post' element={<CreatePost />}/>
          <Route path='/post/:id' element={<ViewPost />}/>
          <Route path='/' element={ state.loggedIn ? <Home/>: <HomeGuest/>}/>
          <Route path='/profile/:username/*' element={<Profile />}/>
          <Route path='/about-us' element={<About />}/>
          <Route path='/terms' element={<Terms />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>

  );
}

export default App;
