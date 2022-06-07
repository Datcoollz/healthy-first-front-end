import { useState, useEffect } from 'react';
import Loading from "../Loading"
import { user, users, emptyUser, getUserList, getUser, deleteGrant } from './LoginData';
import EditBar from '../Tables/EditBar';
import { useNavigate } from 'react-location';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { grants } from '../../../Interface/Grant';

export default function UserPage() {
    const [users, setUsers] = useState<users>([])
    const [user, setUser] = useState<user>(emptyUser)
    const [hasAuth, setAuth] = useState(false)
    const [userLoading, setUserLoading] = useState(true)
    const [userListLoading, setUserListLoading] = useState(true)

    const [grants, setGrants] = useState<grants>([])

    const nav = useNavigate()

    const loadUser = async () => {
        setUserLoading(true)
        const r = await getUser()
        const u = await r.json()
        setUser(u);
        setUserLoading(false)
    }

    const loadList = async () => {
        setUserListLoading(true)
        const r = await getUserList()
        const s = await r.status;
        if (s != 401) {
            setAuth(true)
            const u = await r.json();
            console.log(u)
            setUsers(u)
        }
        setUserListLoading(false)
    }

    const onDelete = async (id: number) => {
        setUserListLoading(true)
        setGrants(await fetch("/api/grants?user=" + id.toString()).then(r => r.json()))
        await Promise.all(grants.map((g) => deleteGrant(g.id)))
        await fetch("/api/users/" + id.toString(), { method: 'DELETE' })
        await load()
        setUserListLoading(false)
    }

    const load = () => { loadList(); loadUser() }

    useEffect(() => { load() }, [])

    return (
        <div className='flex flex-col page'>
            <div className='flex flex-row mb-5'>
                <div className='p-5 border-4 shadow-lg border-slate-400 rounded flex-grow block'>
                    {userLoading ?
                        <Loading />
                        :
                        <>
                            <div className='large-text'>{user.username}</div>
                            <div>{"Vai trò: " + (hasAuth ? "Quản lý" : "Chuyên viên")}</div>
                        </>
                    }
                </div>
                <button onClick={() => { nav({ to: "../../" }) }}><ChevronLeftIcon className='icon' /></button>
            </div>
            {
                hasAuth ?
                    <div className='flex flex-col items-center'>
                        {userListLoading ?
                            <Loading />
                            :
                            <>
                                <div>
                                    <button onClick={() => { nav({ to: "add" }) }}>Thêm tài khoản</button>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Tên tài khoản</th>
                                            <th>Vai trò</th>
                                            {hasAuth ? <th>Thao tác</th> : ""}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.id}</td>
                                                <td>{u.username}</td>
                                                {u.type === 1 ?
                                                    <>
                                                        <td>Quản lý</td>
                                                        <td>Không được chỉnh sửa quản lý</td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>Chuyên viên</td>
                                                        <td><EditBar
                                                            onEdit={() => { nav({ to: "edit/" + u.id.toString() }) }}
                                                            onDelete={() => { onDelete(u.id) }} /></td>
                                                    </>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    )
}