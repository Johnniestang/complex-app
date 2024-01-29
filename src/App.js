import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import FlashMessages from './components/FlashMessages';

Axios.defaults.baseURL = 'http://localhost:8080';

function App() {

  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexAppToken')));
  const [flashMessages, setFlashMessages] = useState([]);

  const addFlashMessage = (message) => {
    setFlashMessages( prev =>  prev.concat(message));
  }

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <FlashMessages messages={flashMessages}/>
      <Routes>
      <Route path='/create-post' element={<CreatePost addFlashMessage={addFlashMessage}/>}/>
      <Route path='/post/:id' element={<ViewPost />}/>
      <Route path='/' element={ loggedIn ? <Home/>: <HomeGuest/>}/>
      <Route path='/about-us' element={<About />}/>
      <Route path='/terms' element={<Terms />}/>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
