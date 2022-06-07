import { useState, useEffect } from "react";
import { useNavigate } from "react-location";
import { plans } from "../../Interface/PlanData";
import TableDropdown from "../Components/TableDropdown";
import { getPlans } from "./Tables/TableData";
import Loading from "./Loading";
import PlanTable from "./PlanPage/PlanTable";

export default function PlanPage() {
    const nav = useNavigate();
    const onAdd = async () => {
        setLoading(true); const r = await fetch("/api/plans/create", { method: 'POST' }); await load(); setLoading(false) }

    const [plans, setPlans] = useState<plans>([]);
    const [loading, setLoading] = useState(true)

    const onDelete = async (id: number) => {
        setLoading(true)
        const r = await fetch("/api/plans/" + id.toString(), { method: 'DELETE' })
        await load()
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const p = await getPlans().then(r => r.json());
        console.log(p)
        setPlans(p)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div>
            <TableDropdown onAdd={onAdd} />
            <PlanTable plans={plans} onDelete={onDelete} />
        </div>
    )
}