import { useState, useEffect } from 'react';
import { useNavigate } from "react-location";
import Loading from "../Loading";
import { districts, district } from '../../../Interface/District';
import { ward, wards } from '../../../Interface/Ward';
import { getDistricts, getWards } from '../Tables/TableData';
import FormInput from "../../Components/FormInput";
import DialogBar from "../../Components/DialogBar";
import { user, emptyUser, getUser } from './LoginData';
import { XIcon, CheckIcon } from '@heroicons/react/solid';

export default function AddUser() {
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [confirmPass, setConfirmPass] = useState("")
    const [confirmPassError, setConfirmPassError] = useState("");

    interface checkedList { id: number, checked: boolean }

    const [districts, setDistricts] = useState<districts>([])
    const [selectedDistricts, setSelectedDistricts] = useState<checkedList[]>([])
    const [wards, setWards] = useState<wards>([])
    const [selectedWards, setSelectedWards] = useState<checkedList[]>([])

    const [hasAuth, setAuth] = useState(false)

    const [loading, setLoading] = useState(true)
    const [dataError, setDataError] = useState(false)
    const nav = useNavigate();

    const confirm = async () => {
        setUsernameError("")
        setPasswordError("")
        setConfirmPassError("")
        if (!username) setUsernameError("Hãy nhập tên tài khoản")
        else if (!password) setPasswordError("Hãy nhập mật khẩu")
        else if (!confirmPass) setConfirmPassError("Hãy nhập lại mật khẩu")
        else if (confirmPass !== password) setConfirmPassError("Nhập lại không khớp mật khẩu")
        else {
            setLoading(true)
            const r = await fetch("/api/users", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const s = await r.status
            const u = await r.json()
            if (s === 200) {
                console.log("new user")
                await Promise.all(selectedDistricts.filter((d) => d.checked).map((o) => {
                    return fetch("/api/grants", {
                        method: 'POST',
                        body: JSON.stringify({
                            userId: u.id,
                            districtId: o.id
                        }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                })
                )
                Promise.all(selectedWards.filter((w) => w.checked).map((o) => {
                    if (o.checked)
                        return fetch("/api/grants", {
                            method: 'POST',
                            body: JSON.stringify({
                                userId: u.id,
                                wardId: o.id
                            }),
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                })
                )
                nav({ to: "../" })
            }
            setLoading(false)
        }
    }

    const cancel = () => {
        nav({ to: "../" })
    }

    interface checkedList { id: number, checked: boolean }

    const checkDistrict = (id: number) => {
        console.log(id)
        let items = [...selectedDistricts]
        let index = items.findIndex((i) => i.id === id)
        items[index].checked = !items[index].checked
        setSelectedDistricts(items)
    }

    const checkWard = (id: number) => {
        console.log(id)
        let items = [...selectedWards]
        let index = items.findIndex((i) => i.id === id)
        items[index].checked = !items[index].checked
        setSelectedWards(items)
    }

    const load = async () => {
        setLoading(true)
        const r = await getUser()
        const u = await r.json()
        if (u.type === 1) {
            setAuth(true);
            const d = await getDistricts().then(r => r.json())
            const w = await getWards().then(r => r.json())
            setDistricts(d)
            setWards(w)
            setSelectedDistricts(d.map((i: district) => { return { id: i.id, checked: false } }))
            setSelectedWards(w.map((i: ward) => { return { id: i.id, checked: false } }))
        }
        else {
            setAuth(false)
        }
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    if (!hasAuth) return (
        <div className='flex flex-col'>
            <div className='flex flex-row justify-center'>
                <span className='large-text'>Bạn không có quyền tạo người dùng mới</span>
            </div>
            <div className='flex flex-row justify-center '>
                <button onClick={() => { nav({ to: "../../" }) }}>Về trang chủ</button>
            </div>
        </div>
    )
    return (
        <div className="flex flex-col items-center">
            <div className='large-text'>Thêm tài khoản chuyên viên</div>
            <form>
                <FormInput label="Tên tài khoản" placeholder="" type="text"
                    value={username}
                    onChange={setUsername}
                    isError={true}
                    errorText={usernameError}
                />
                <FormInput label="Mật khẩu" placeholder="" type="password"
                    value={password}
                    onChange={setPassword}
                    isError={true}
                    errorText={passwordError}
                />
                <FormInput label="Xác nhận mật khẩu" placeholder="" type="password"
                    value={confirmPass}
                    onChange={setConfirmPass}
                    isError={true}
                    errorText={confirmPassError}
                />
                <div className="text-error">{dataError ? "Dữ liệu đã thay đổi, hãy tải lại trang." : ""}</div>
            </form>
            <div className='flex flex-col justify-between mt-5 md:flex-row'>
                <table className='mr-5 mb-5'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Quận</th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {districts.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.name}</td>
                                <td><button onClick={() => { checkDistrict(o.id) }}>
                                    {selectedDistricts.find((i) => i.id === o.id)?.checked ?
                                        <CheckIcon className='icon' /> :
                                        <XIcon className='icon' />
                                    }
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className='mb-5'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Phường</th>
                            <th>Thuộc quận</th>
                            <th>Quản lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wards.map(o => (
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.name}</td>
                                <td>{districts.find(d => d.id === o.districtId)?.name}</td>
                                <td><button onClick={() => { checkWard(o.id) }}>
                                    {selectedWards.find((i) => i.id === o.id)?.checked ?
                                        <CheckIcon className='icon' /> :
                                        <XIcon className='icon' />
                                    }
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DialogBar onConfirm={confirm} onCancel={cancel} />
        </div >
    );
}