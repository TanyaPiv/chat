import React, { useState } from 'react';
import './App.css';
import Authorization from './ Auth';
import CreateChat from './Chat/CreateChat';
import Chat from './Chat/Chat';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from './ProtectedRoute';
import { createContext } from 'react';

interface Iphone {
  phone: string;
  handlePhoneChange: (newPhone: string) => void;
}

export const MyPhoneContext = createContext<Iphone>({
  phone: '',
  handlePhoneChange: () => {}
});


function App() {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (newPhone: string) => setPhone(newPhone);

  return (
    <MyPhoneContext.Provider value={{ phone, handlePhoneChange}}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.AUTH} element={<Authorization/>} />
          <Route element={<ProtectedRoute/>}>
            <Route path={ROUTES.REGISTER} element={<CreateChat/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path={ROUTES.CHAT} element={<Chat/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MyPhoneContext.Provider>
  );
}

export default App;
