import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-location";
import Loading from "../Loading";
import { plan } from "../../../Interface/PlanData";
import { getPlan } from "../Tables/TableData";

export default function EditPlan() {
    const { params: { id } } = useMatch()
    const nav = useNavigate();
    const onAdd = () => { nav({ to: "../../shops/add" }) }

    const [plan, setPlan] = useState<plan>();
    const [loading, setLoading] = useState(true)

    const onDelete = async (id: number) => {
        setLoading(true)
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const p = await getPlan(parseInt(id)).then(r => r.json())
        console.log(p)
        setPlan(p)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div>
        </div>
    )
}