import { useState, useContext } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// import Flash from '../components/Flash';
import { UserContext } from "../component/UserContext";
import AuthContext from '../component/AuthContext';


export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [logged, setLogged] = useState(false)
	const [message, setMessage] = useState('')
	const [isflash, setIsflash] = useState(false)

	const {setUser} = useContext(UserContext)
	const handleLogin = async (e) => {
		e.preventDefault()
		localStorage.setItem('token','osm')
		try {
			const response = await fetch('http://localhost:3333/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials:'include'

			})

			if (response.ok) {
				const data = await response.json();

				localStorage.setItem('token', data.token)
				localStorage.setItem('role', data.role)
				localStorage.setItem('email', data.email)

				// onLogin(token)
				setLogged(true)
				setUser(data)
			} else {
				const data = await response.json()
				setMessage(data.message)
				setIsflash(true)
			}
		} catch (error) {
			console.error('Network error:', error);
		}
	}
	// const token = localStorage.getItem('token')
	const onClose = () => {
		setIsflash(false)
	}

	if (logged) {
		return <Navigate to={'/'} />
	}
	return (
		<div className='h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-5 justify-center items-center p-5 h-3/6 lg:w-1/3 md:w-1/2 shadow-2xl'>
				<h2 className='text-2xl font-bold'>LOGIN</h2>
				<form onSubmit={handleLogin} className="flex flex-col gap-5">
					<input
						className='input input-bordered input-primary w-full max-w-xs'
						type="text"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="E-mail" />
					<input
						className='input input-bordered input-primary w-full max-w-xs'
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Mot de passe" />
					<button className='btn btn-primary'>Login</button>
					<NavLink to={'/forgot-password'}>Mot de passe oublié</NavLink>
				</form>
				{/* {isflash && <Flash color="red" message={message} onClose={onClose} />} */}
			</div>
		</div>
	)
}