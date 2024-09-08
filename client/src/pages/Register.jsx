import { useEffect, useState,  } from "react"
import Modal from "../component/Modal";
import User from "../component/User";
import { Navigate, useNavigate } from "react-router-dom";

//   const ENDPOINT = 'http://134.157.57.237:3500' 
//   const ENDPOINT = 'http://localhost:3500' 
const ENDPOINT = 'http://localhost:8000/api'
export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	const [users, setUsers] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleteModal, setIsDeleteModal] = useState(false)
	const [is401,setIs401] = useState(false)
	const navigate = useNavigate()
	const fetchUser = async () => {
		const response = await fetch(`${ENDPOINT}/user`, {
			credentials:'include'
		})
		console.log(response.status);
		
		if (response.status === 401) {
            setIs401(true)
            // navigate('/login')
        } else if (response.ok) {
			const data = await response.json()
			setUsers(data)
			console.log(data);
			
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	const handleAddUser = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(`${ENDPOINT}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, role }),
				credentials: 'include'

			})

			if (response.ok) {
				const data = await response.json();
				console.log(data.message)
				fetchUser()
				setIsOpen(false);

				setEmail('')
				setPassword('')
				setRole('')

			} else {
				const data = await response.json()

			}
		} catch (error) {
			console.error('Network error:', error);
		}
	}

	const openAddModal = () => {
		setIsOpen(true);
		setIsDeleteModal(false)
	};

	const handleDelete = (id) => {
		setIsDeleteModal(true)
		const [user] = users.filter(user => {
			return user.id === id
		})
		localStorage.setItem('user', user.email)
		localStorage.setItem('deletUserId', id)
	};

	const submitDelete = async () => {
		const id = localStorage.getItem('deletUserId')
		const response = await fetch(`${ENDPOINT}/user/delete/${id}`, {
			credentials: 'include'
		})

		if (response.ok) {
			const data = await response.json()
			console.log(data.message)
			fetchUser()
			setIsDeleteModal(false)
		}
	}

	const closeModal = () => {
		setIsOpen(false);

		setEmail('')
		setPassword('')
		setRole('')
	};

	const onCloseDeleteModal = () => {
		setIsDeleteModal(false)
	}

	const onClose401 = () => {
		setIs401(false)
		navigate('/login')
	}

	const userRole = localStorage.getItem('role')
	// si le role n'est pas administrateur revenir sur la page d'accueil
	// Redirection vers la page de login si l'utilisateur n'est pas authentifié
    if (userRole !== 'Administrateur') {
        return <Navigate to={'/login'} />;
    }
	return (
		
		<div className="ml-64">
            
			<div className="flex-grow p-6 bg-gray-100">
				<h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
			</div>
			<Modal isOpen={is401} onClose={onClose401} bg={''}>
				<p className="mb-3">Votre connection est expirimée. Recoonectez-vous à nouveau!</p>
			</Modal>

			<User users={users} openAddModal={openAddModal} handleDelete={handleDelete} />

			<Modal isOpen={isDeleteModal} onClose={onCloseDeleteModal} bg={''} >
				<p className="mb-3">Vous êtes sûr de vouloir supprimer l'utilisateur {localStorage.getItem('user')}?</p>
				<div className="flex justify-start gap-3">
					<button onClick={submitDelete} className="btn btn-neutral btn-sm">Oui</button>
					<button onClick={onCloseDeleteModal} className="btn btn-neutral btn-sm">Non</button>
				</div>
			</Modal>

			<Modal isOpen={isOpen} onClose={closeModal} className="ml-64">
				<div className=' flex justify-center items-center  '>
					<div className='flex flex-col gap-5 justify-center items-center  w-full'>
						<h2 className='text-2xl font-bold'>Ajouter un utilisateur</h2>
						<form onSubmit={handleAddUser} className="flex flex-col gap-5 w-1/2 max-md:w-full ">
							<input
								className='input input-bordered input-primary w-full '
								type="text"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="E-mail" />
							<input
								className='input input-bordered input-primary w-full '
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Mot de passe" />
							<select className="select select-bordered select-primary w-full" defaultValue={'DEFAULT'}
								onChange={(e) => setRole(e.target.value)}>
								<option value="DEFAULT" disabled>Choisir un rôle</option>
								<option value="Administrateur">Administrateur</option>
								<option value="Validateur">Validateur</option>
								<option value="Annotateur">Annotateur</option>
							</select>
							<button className='btn btn-primary'>Valider</button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	)
}


