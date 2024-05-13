import { useEffect, useState } from "react"
import Modal from "../component/Modal";
import User from "../component/User";
import Flash from "../component/Flash";



export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')
	const [users, setUsers] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleteModal, setIsDeleteModal] = useState(false)

	const fetchUser = async () => {
		const response = await fetch('http://localhost:3333/user')
		if (response.ok) {
			const data = await response.json()
			setUsers(data)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	const handleAddUser = async (e) => {
		e.preventDefault()
		// console.log(role);
		try {
			const response = await fetch('http://localhost:3333/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, role }),
				credentials: 'include'

			})

			if (response.ok) {
				const data = await response.json();
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
		console.log(id);
		setIsDeleteModal(true)
		const [user] = users.filter(user => {
			return user.id === id
		})
		localStorage.setItem('user', user.email)
		localStorage.setItem('id', id)
		console.log(user);
	};

	const submitDelete = async () => {
		const id = localStorage.getItem('id')
		const response = await fetch(`http://localhost:3333/user/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		})

		if (response.ok) {
			const data = await response.json()
			console.log(data);
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
	return (
		<>
			<User users={users} openAddModal={openAddModal} handleDelete={handleDelete} />
			<Modal isOpen={isDeleteModal} onClose={onCloseDeleteModal} bg={''}>
				<p className="mb-3">Vous êtes sûr de vouloir supprimer l'utilisateur {localStorage.getItem('user')}?</p>
				<div className="flex justify-start gap-3">
					<button onClick={submitDelete} className="btn btn-neutral btn-sm">Oui</button>
					<button onClick={onCloseDeleteModal} className="btn btn-neutral btn-sm">Non</button>
				</div>
			</Modal>

			<Modal isOpen={isOpen} onClose={closeModal} >
				<div className=' flex justify-center items-center'>
					<div className='flex flex-col gap-5 justify-center items-center  '>
						<h2 className='text-2xl font-bold'>Ajouter un utilisateur</h2>
						<form onSubmit={handleAddUser} className="flex flex-col gap-5">
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
							<select className="select select-bordered select-primary w-full max-w-xs" defaultValue={'DEFAULT'}
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
		</>
	)
}


