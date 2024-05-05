import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import Flash from '../components/Flash';

export default function Login() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [logged, setLogged] = useState(false)
	const [message, setMessage] = useState('')
	const [isflash, setIsflash] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault()
		localStorage.setItem('token','osm')
		setLogged(true)
		// try {
		// 	const response = await fetch('http://localhost:3300/login', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ email, password }),
		// 	})

		// 	if (response.ok) {
		// 		const data = await response.json();
		// 		const { token } = data;
		// 		const decoded = (token)
		// 		console.log(decoded.role);
		// 		console.log(token);
		// 		localStorage.setItem('token', token)
		// 		localStorage.setItem('role', decoded.role)
		// 		// onLogin(token)
		// 		setLogged(true)

		// 	} else {
		// 		const data = await response.json()
		// 		setMessage(data.message)
		// 		setIsflash(true)
		// 	}
		// } catch (error) {
		// 	console.error('Network error:', error);
		// }
	}
	const token = localStorage.getItem('token')
	const onClose = () => {
		setIsflash(false)
	}

	if (logged) {
		return <Navigate to={'/'} />
	}
	return (
		<div className='h-screen flex justify-center items-center'>

			<div className='flex flex-col gap-5 justify-center items-center p-5 h-3/6 w-1/3 shadow-2xl'>
				<h2 className='text-2xl font-bold'>LOGIN</h2>
				<form onSubmit={handleLogin} className="flex flex-col gap-5">
					<input
						className='input input-bordered input-primary w-full max-w-xs'
						type="text"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email" />
					<input
						className='input input-bordered input-primary w-full max-w-xs'
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password" />
					<button className='btn btn-primary'>Login</button>
					<NavLink to={'/forgot-password'}>Forgetten Password</NavLink>
				</form>
				{/* {isflash && <Flash color="red" message={message} onClose={onClose} />} */}
			</div>
		</div>
	)
}