import { useState, useEffect } from "react";
import { useNavigate } from "react-location";
import { plans } from "../../../Interface/PlanData";
import { getPlans } from '../Tables/TableData';
import Loading from "../Loading";
import EditBar from '../Tables/EditBar';
import { TrashIcon } from '@heroicons/react/solid';

interface p {
    plans: plans;
    onDelete: (id: number) => void
}

export default function PlanTable(props: p) {
    const nav = useNavigate();
    const onAdd = () => { nav({ to: "../../shops/add" }) }


    const [loading, setLoading] = useState(true)

    const onDelete = async (id: number) => {
        setLoading(true)
        setLoading(false)
    }

    return (
        <div className="flex justify-center">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Số hoạt động thanh</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {props.plans.map((p) =>
                        <tr>
                            <td>{p.planId}</td>
                            <td>{p.activities.length.toString()}</td>
                            <td>{p.activities.filter((a) => (a.currentStep >= 3)).length > 0 ? "Chưa hoàn thành" : "Hoàn thành"}</td>
                            <td><button onClick={() => { props.onDelete(p.planId) }}><TrashIcon className="icon" /></button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}