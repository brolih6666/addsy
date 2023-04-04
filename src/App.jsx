import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import LoginIn from './components/LoginIn'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className='App min-h-screen h-screen w-full flex flex-col '>
			<Navbar />

			<Routes>
				<Route path='/' element={<LoginIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route
					path='/account'
					element={
						<ProtectedRoute>
							<Account />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
