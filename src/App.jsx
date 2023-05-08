import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { UserAuth } from './context/AuthContext'
import ViewListing from './components/viewListing/ViewListing'
import useScrollDirection from './hooks/useScrollDirection'
import Account from './components/Account'
import MainPage from './components/MainPage'
import AddListing from './components/addListing/AddListing'
import ProtectedRoute from './components/ProtectedRoute'
import Favourites from './components/Favourites'
import { Routes, Route } from 'react-router-dom'
import useFirestore from './hooks/useFirestore'
import ViewCategory from './components/viewCategory/ViewCategory'
function App() {
	const { user } = UserAuth()
	const { collectionDocuments } = useFirestore('users')
	const [activeUser, setActiveUser] = useState(null)

	const activeUserFetch = () => {
		let active = {}
		collectionDocuments?.map(dbUser => {
			if (dbUser?.email != user?.email) return
			setActiveUser(dbUser)
			active = dbUser
			return active
		})
	}
	!activeUser && activeUserFetch()

	return (
		<>
			<div
				className={`App min-h-screen  bg-slate-100 w-full max-w-screen overflow-x-hidden flex flex-col items-center transition-all `}>
				<Navbar />

				<Routes>
					<Route path='/' element={<MainPage activeUser={activeUser} activeUserFetch={activeUserFetch} />} />
					<Route path='/listing/:id' element={<ViewListing />} />
					<Route path='/category/:id' element={<ViewCategory />} />

					<Route
						path='/addListing'
						element={
							<ProtectedRoute>
								<AddListing activeUser={activeUser} activeUserFetch={activeUserFetch} />
							</ProtectedRoute>
						}
					/>
					<Route path='/account' element={<Account activeUser={activeUser} />} />
					<Route
						path='/favourites'
						element={
							<ProtectedRoute>
								<Favourites activeUser={activeUser} activeUserFetch={activeUserFetch} />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
