import { useMatch, useNavigate } from 'react-location';
import { useState, useEffect } from 'react';
import { user, getUserList, emptyUser, deleteGrant } from './LoginData';
import Loading from "../Loading";
import { CheckIcon, ChevronLeftIcon, XIcon } from '@heroicons/react/solid';
import { districts, district } from '../../../Interface/District';
import { wards, ward } from '../../../Interface/Ward';
import { getDistricts, getWards } from '../Tables/TableData';
import DialogBar from '../../Components/DialogBar';
import { grants } from '../../../Interface/Grant';

export default function EditUser() {
    const { params: { id } } = useMatch()
    const [editUser, setEditUser] = useState<user>(emptyUser)
    const [loading, setLoading] = useState(true)
    const [districts, setDistricts] = useState<districts>([])
    const [selectedDistricts, setSelectedDistricts] = useState<checkedList[]>([])
    const [wards, setWards] = useState<wards>([])
    const [hasAuth, setAuth] = useState(false)
    const [grants, setGrants] = useState<grants>([])
    const [selectedWards, setSelectedWards] = useState<checkedList[]>([])

    interface checkedList { id: number, checked: boolean }

    const nav = useNavigate()

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

    const onConfirm = async () => {
        setLoading(true)
        await Promise.all(selectedDistricts.map((d) => {
            if (d.checked) {
                if (grants.filter((o) => o.districtId === d.id).length <= 0)
                    return fetch("/api/grants", {
                        method: 'POST',
                        body: JSON.stringify({ userId: parseInt(id), districtId: d.id }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                return ""
            }
            else {
                if (grants.filter((o) => o.districtId === d.id).length > 0)
                    return fetch("/api/grants/" +
                        grants.find((o) => o.districtId === d.id)?.id.toString(), {
                        method: 'DELETE',
                    })
            }
        }))
        await Promise.all(selectedWards.map((d) => {
            if (d.checked) {
                if (grants.filter((o) => o.wardId === d.id).length <= 0)
                    return fetch("/api/grants", {
                        method: 'POST',
                        body: JSON.stringify({ userId: parseInt(id), wardId: d.id }),
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                return ""
            }
            else {
                if (grants.filter((o) => o.wardId === d.id).length > 0) {
                    return fetch("/api/grants/" +
                        grants.find((o) => o.wardId === d.id)?.id.toString(), {
                        method: 'DELETE',
                    })
                }
            }
        }))
        nav({ to: "../../" })
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const r = await getUserList()
        const ul = await r.json()
        setEditUser(ul.find((u: user) => u.id === parseInt(id)))
        const d = await getDistricts().then(r => r.json())
        const w = await getWards().then(r => r.json())
        const g = await fetch("/api/grants?user=" + parseInt(id), { method: 'GET' }).then(r => r.json())
        setGrants(g)
        setSelectedDistricts(d.map((i: district) => { return { id: i.id, checked: false } }))
        setSelectedWards(w.map((i: ward) => { return { id: i.id, checked: false } }))
        setDistricts(d); setWards(w)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    return (
        <div className='flex flex-col page'>
            <div className='flex flex-row mb-5'>
                <div className='p-5 border-4 shadow-lg border-slate-400 rounded flex-grow block'>
                    {loading ?
                        <Loading />
                        :
                        <>
                            <div className='large-text'>{editUser.username}</div>
                            <div>{"Vai trò: " + (editUser.type === 1 ? "Quản lý" : "Chuyên viên")}</div>
                        </>
                    }
                </div>
            </div>
            <div>
                <button onClick={() => { nav({ to: "../../" }) }}><ChevronLeftIcon className='icon' /></button>
            </div>
            {loading ? <Loading /> :
                <div className='flex flex-row justify-between mt-5 md:flex-row'>
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
            }
            <div className='flex flex-row justify-center'>
                <DialogBar onCancel={() => { nav({ to: "../../" }) }} onConfirm={onConfirm} />
            </div>
        </div>
    )
}