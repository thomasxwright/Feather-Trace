import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const authContext = createContext()

function useAuth() {
	let navigate = useNavigate();

	const [authed, setAuthed] = useState(false)
	const [user, setUser] = useState({})
	const [sightings, setSightings] = useState([])

	const fetchSightings = async () => {
		const res = await fetch(`/sightings/`, { credentials: 'include' })
		const data = await res.json()
		return data
	}

	const getSightings = async () => {
		const sightingsFromServer = await fetchSightings()
		console.log(new Date().toLocaleTimeString(), 'found sightings:', sightingsFromServer)
		return sightingsFromServer
	}

	useEffect(() => {
		(async () => {
			try {
				const response = await axios({
					method: 'GET',
					url: '/authenticated',
					withCredentials: true,
				})
				if (response.status === 200) {
					setAuthed(true)
					setUser(response.data)
					const sightings = await getSightings()
					setSightings(sightings)
				} else {
					setAuthed(false)
					setUser({})
				}
			} catch (err) {
				console.log(err)
			}
		})()
	}, [])

	return {
		authed,
		user,
		sightings,
		async handleLogin(user) {
			setUser(user)
			setAuthed(true)
			const sightings = await getSightings()
			setSightings(sightings)
		},
		async handleLogout() {
			try {
				const response = await axios({
					method: 'GET',
					url: '/logout',
					withCredentials: true,
				})
				console.log('From Server:', response.data.message.msgBody)
				setAuthed(false)
				setUser(null)
				setSightings([])
				// navigate('/');
			} catch (err) {
				console.log(err)
			}
		}
	}
}

export function AuthProvider({ children }) {
	const auth = useAuth()

	return <authContext.Provider value={auth}>
		{children}
	</authContext.Provider>
}

export default function AuthConsumer() {
	return useContext(authContext)
}
