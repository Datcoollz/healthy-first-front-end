import { useNavigate } from 'react-location';
import DropdownInput from '../../Components/DropdownInput';
import { basicData } from '../../../Interface/BasicData';
import { useState, useEffect } from 'react';
import { getUser } from './LoginData';
import { DotsHorizontalIcon } from '@heroicons/react/solid';

const userCommand = [
    { id: 0, name: "Quản lý người dùng" },
    { id: 1, name: "Đăng xuất" }
]

export default function UserBar() {
    const [label, setLabel] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    const logout = async () => { await fetch("api/auth/logout", { method: "POST" }); nav({ to: "../../" }) }

    const toCommand = (e: basicData) => {
        switch (e.id) {
            case 0: nav({ to: "../../../../user" }); break;
            case 1: logout(); break;
            default: break;
        }
    }

    const toLogin = () => {
        nav({ to: '../../../login' })
    }

    const load = async () => {
        setLoading(true);
        const l = await getUser()
        const s = await l.status
        console.log(s)
        if (s === 200) {
            setLoggedIn(true);
            console.log("logged in")
            const u = await l.json()
            setLabel("Xin chào, " + u.username);
        }
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<DotsHorizontalIcon className=' w-20 h-20 text-slate-600' />)
    if (loggedIn) return (
        <div>
            <DropdownInput
                label={label}
                list={userCommand}
                selectedValue={{ id: 0, name: "" }}
                onChange={toCommand} />
        </div>
    )
    return (<button onClick={toLogin}>Đăng nhập</button>)
}