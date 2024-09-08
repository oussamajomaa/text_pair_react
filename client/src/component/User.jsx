
import { NavLink } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";

export default function User({ users, openAddModal, handleDelete }) {
    const email = localStorage.getItem('email')
    return (
        <div className="p-5 shadoww xl:w-1/2 m-auto md:w-2/3">
            <h1 className="text-center font-bold text-2xl mb-3">Liste des utilisateurs</h1>
            <button onClick={openAddModal} className="block ml-auto mb-2"><IoIosAddCircle size={40} color="#5C7BD9" /></button>
            <div className="bg-slate-300 p-5  rounded-lg">
                <div className="flex gap-2 w-full mb-2 pb-2 border-b-2">
                    <span className="w-5/12 font-bold">Username</span>
                    <span className="w-5/12 font-bold">E-mail</span>
                    <span className="w-5/12 font-bold">Role</span>
                    <span className="w-2/12 font-bold ">Actions</span>
                </div>

                {users?.filter(user => email !== user.email).map(user => (
                    <div className="flex gap-2 w-full p-4 hover:bg-slate-400 bg-white mb-2 rounded-lg" key={user.id}>
                        <p className="w-5/12">{user.username}</p>
                        <p className="w-5/12">{user.email}</p>
                        <p className="w-5/12">{user.role}</p>
                        <div className="w-2/12 flex justify-around">
                            <button onClick={() => handleDelete(user.id)}>
                                <MdDelete size={32} color="#DC2626" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
