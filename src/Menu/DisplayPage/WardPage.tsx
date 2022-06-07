import { useNavigate } from 'react-location';
import { districts } from '../../Interface/District';
import { shops } from '../../Interface/Shop';
import { wards } from '../../Interface/Ward';
import { useEffect, useState } from 'react';
import TableDropdown from '../Components/TableDropdown';
import WardList from './WardPage/WardTable';
import { getShops, getDistricts, getWards, deleteWard } from './Tables/TableData';
import Loading from './Loading';
import { grants } from '../../Interface/Grant';

export default function WardPage() {
    const nav = useNavigate();
    const onAdd = () => { nav({ to: "../../wards/add" }) }

    const [shops, setShops] = useState<shops>([]);
    const [districts, setDistricts] = useState<districts>([]);
    const [wards, setWards] = useState<wards>([]);

    const [loading, setLoading] = useState(true)

    const onDelete = async (id: number) => {
        setLoading(true)
        await deleteWard(id)
        await load()
        setLoading(false)
    }

    const load = async () => {
        setLoading(true);
        const [s, d, w] = await Promise.all([
            getShops().then(r => r.json()), getDistricts().then(r => r.json()), getWards().then(r => r.json())])
        setShops(s);
        setDistricts(d);
        setWards(w);
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div>
            <TableDropdown onAdd={onAdd} />
            <WardList shops={shops} districts={districts} wards={wards} onDelete={onDelete} />
        </div>
    )

}