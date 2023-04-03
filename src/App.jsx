import { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import LoginIn from './components/LoginIn'
import Account from './components/Account'
import { Routes, Route } from 'react-router-dom'
function App() {
	const [count, setCount] = useState(0)

	return (
		<div className='App w-full h-screen bg-red-200'>
			<Routes>
				<Route path='/' element={<LoginIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/account' element={<Account />} />
			</Routes>
		</div>
	)
}

export default App
