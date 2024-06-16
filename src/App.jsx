import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AptosProvider } from "./context/ContextProvider";
import Home from './pages/Home';
import NavHome from './components/NavHome';
import Bet from './pages/Bet';
import BetView from './pages/BetView';
import RegisterUser from './components/RegisterUser';
import Message from './pages/Message';
import Profile from './pages/Profile';
import HelpBuilders from './pages/HelpBuilders';
import TipBuilder from './components/TipBuilder';
import Preview from './pages/Preview';


function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <AptosProvider>
            <Routes>
              <Route path="/" element={<Preview /*state = {state}*/ />} />
              <Route path="/home" element={<Home /*state = {state}*/ />} />
              <Route
                path="/builders"
                element={<HelpBuilders /*state = {state}*/ />}
              />
              <Route
                path="/profile"
                element={<Profile /*state = {state}*/ />}
              />
              <Route path="/chat" element={<Message /*state = {state}*/ />} />
              <Route path="/bet" element={<Bet /*state = {state}*/ />} />
              <Route
                path="/betview"
                element={<BetView /*state = {state}*/ />}
              />
              <Route
                path="/temp"
                element={<TipBuilder /*state = {state}*/ />}
              />
            </Routes>
            {/* {<RegisterPage/>}  */}
          </AptosProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
