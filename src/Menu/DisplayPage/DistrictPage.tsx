import { useNavigate } from 'react-location';
import { districts } from '../../Interface/District';
import { shop, shops } from '../../Interface/Shop';
import { ward, wards } from '../../Interface/Ward';
import { useEffect, useState } from 'react';
import TableDropdown from '../Components/TableDropdown';
import DistrictList from './DistrictPage/DistrictTable';
import { getShops, getDistricts, getWards, deleteShop, deleteWard, deleteDistrict } from './Tables/TableData';
import Loading from './Loading';
import { grants, grant } from '../../Interface/Grant';
import { deleteGrant } from './UserPage/LoginData';

export default function DistrictPage() {
    const nav = useNavigate();
    const onAdd = () => { nav({ to: "../../districts/add" }) }

    const [districts, setDistricts] = useState<districts>([]);

    const [loading, setLoading] = useState(true)

    const onDeleteDistrict = async (id: number) => {
        setLoading(true)
        await deleteDistrict(id)
        await load()
        setLoading(false);
    }

    const load = async () => {
        setLoading(true);
        const d = await getDistricts().then(r => r.json())
        setDistricts(d);
        setLoading(false);
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div>
            <TableDropdown onAdd={onAdd} />
            <DistrictList districts={districts}
                onDelete={onDeleteDistrict} onEdit={(id) => { nav({ to: id.toString() }) }} />
        </div>
    )

}