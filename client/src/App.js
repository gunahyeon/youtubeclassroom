import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Footer from './components/views/Footer/Footer';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />}/>
					<Route path="/login" element={<LoginPage />}/>
					<Route path="/register" element={<RegisterPage />}/>
					{/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리
					<Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
