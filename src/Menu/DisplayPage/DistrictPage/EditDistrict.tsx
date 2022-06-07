import { useState, useEffect } from "react";
import { useMatch, useNavigate } from 'react-location';
import { district, emptyDistrict } from '../../../Interface/District';
import DialogBar from "../../Components/DialogBar";
import FormInput from "../../Components/FormInput";
import { getShop, getDistrict, putDistrict } from '../Tables/TableData';
import Loading from "../Loading";

export default function EditDistrct() {
    const { params: { id } } = useMatch()
    const nav = useNavigate()
    const [oldName, setOldName] = useState("")
    const [district, setDistrict] = useState("")
    const [error, setError] = useState("")
    const [dataError, setDataError] = useState(false)
    const [loading, setLoading] = useState(true)

    const confirm = async () => {
        setLoading(true)
        console.log(district)
        if (district) {
            const s = await putDistrict(parseInt(id), district)
        }
        else {
            setError("Tên không được để trống")
        }
        setLoading(false)
        nav({ to: "../" })
    }

    const load = async () => {
        setLoading(true)
        const r = await fetch("/api/districts/" + id.toString(), { method: 'GET' })
        const d = await r.json();
        const s = await r.status;
        if (s != 200) setDataError(true)
        else {
            setDistrict(d.name)
            setOldName(d.name)
        }
        setLoading(false)
    }

    useEffect(() => { load() }, []);

    if (loading) return (<Loading />)
    if (dataError) return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center font-bungee text-2xl text-slate-600">
                Dữ liệu đã thay đổi hoặc không thu thập được.</div>
        </div>
    )
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row justify-center'>
                <span className='large-text'>Chỉnh sửa: {oldName}</span>
            </div>
            <form>
                <FormInput placeholder={''} label={'Tên cửa hàng'}
                    value={district} onChange={setDistrict}
                    isError={true} errorText={error} type={'text'} />
            </form>

            <DialogBar onConfirm={confirm} onCancel={() => { nav({ to: "../" }) }} />
        </div>
    )
}