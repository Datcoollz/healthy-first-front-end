import TableDropdown from "../Components/TableDropdown";
import ShopTable from "./ShopPage/ShopTable";
import { useNavigate } from 'react-location';
import { shops } from '../../Interface/Shop';
import { districts } from '../../Interface/District';
import { wards } from '../../Interface/Ward';
import { useEffect, useState } from 'react';
import { getDistricts, getShops, getWards, deleteShop } from "./Tables/TableData";
import Loading from "./Loading";

export default function ShopPage() {
    const nav = useNavigate();
    const onAdd = () => { nav({ to: "../../shops/add" }) }

    const [shops, setShops] = useState<shops>([])
    const [districts, setDistricts] = useState<districts>([])
    const [wards, setWards] = useState<wards>([])

    const [loading, setLoading] = useState(true)

    const onDelete = async (id: number) => {
        setLoading(true)
        await deleteShop(id)
        await load()
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const [s, d, w] = await Promise.all([
            getShops().then(r => r.json()), getDistricts().then(r => r.json()), getWards().then(r => r.json()),])
        setShops(s)
        setDistricts(d)
        setWards(w)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div className="page">
            <TableDropdown onAdd={onAdd} />
            <ShopTable shops={shops} districts={districts} wards={wards} onDelete={onDelete} />
        </div>
    )
}