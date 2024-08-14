import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";


// const ENDPOINT = 'http://134.157.57.237:3500' 
const ENDPOINT = 'http://localhost:3500'
export default function Nav() {
	const token = localStorage.getItem('token')
	const role = localStorage.getItem('role')
	const email = localStorage.getItem('email')
	const [isOpen, setIsOpen] = useState(false);
	const [width,setWidth] = useState(window.innerWidth)
	const { user, setUser } = useContext(UserContext)
	window.addEventListener('resize', function(){
		setWidth(window.innerWidth)
		if (width < 1024) {
			setIsOpen(false)
		}
	})

	const logout = () => {
		fetch(`${ENDPOINT}/logout`, {
			credentials: 'include',
			method: 'POST'
		})
		setUser(null)
		localStorage.clear()
		setIsOpen(!isOpen)
	}


	return (

		<>
			{token && <nav className="flex items-center justify-between flex-wrap p-3  bg-slate-600">
				<div className="flex items-center flex-shrink-0  mr-6 lg:mr-72">
					<a href=""><img src="/modern-textpair/logo512.png" className="w-100 h-10 mr-2" alt="Logo" /></a>
					<p className="block mt-4 lg:inline-block lg:mt-0 mr-4 text-white">Bonjour {email}</p>
				</div>
				<div className="block lg:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400">
						<svg
							className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="white"/>
						</svg>
						<svg
							className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" fill="white" />
						</svg>
					</button>
				</div>
				<div className={`w-full block lg:flex lg:items-center lg:w-auto text-white ${isOpen ? "block" : "hidden"}`}>
					<NavLink
						onClick={() => setIsOpen(!isOpen)} to={'/'}
						className='block mt-4 lg:inline-block lg:mt-0  mr-4'>Accueil
					</NavLink>
					{role === 'Validateur' && <NavLink onClick={() => setIsOpen(!isOpen)} to={'/validation'} className="block mt-4 lg:inline-block lg:mt-0 mr-4">Validation</NavLink>}
					{role === 'Administrateur' && <NavLink onClick={() => setIsOpen(!isOpen)} className="block mt-4 lg:inline-block lg:mt-0 mr-4" to={'/register'}>Gestion des utilisateurs</NavLink>}
					{role === 'Annotateur' && <NavLink onClick={() => setIsOpen(!isOpen)} className="block mt-4 lg:inline-block lg:mt-0 mr-4" to={'/update'}>Mise à jour</NavLink>}

					<NavLink className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={logout} to={'/login'} >Déconnexion</NavLink>
					
				</div>
			</nav>}
		</>
	)
}
