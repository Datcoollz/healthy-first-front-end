import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-location";
import Loading from "../Loading";
import { plan, activity, activities } from '../../../Interface/PlanData';
import { getPlan, getShops } from "../Tables/TableData";
import { shops } from '../../../Interface/Shop';
import EditBar from '../Tables/EditBar';
import DropdownInput from "../../Components/DropdownInput";
import { basicData, emptyData } from '../../../Interface/BasicData';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/solid';

export default function EditPlan() {
    const { params: { id } } = useMatch()
    const nav = useNavigate();

    const [plan, setPlan] = useState<plan>()
    const [shops, setShops] = useState<shops>([])
    const [loading, setLoading] = useState(true)

    const getPhase = (i: number) => {
        switch (i) {
            case 1: return "Kiểm tra tại cơ sở"
            case 2: return "Lấy mẫu, thực hiện kiểm định"
            case 3: return "Kết luận thanh kiểm tra"
            default: return "Xử lý vi phạm"
        }
    }

    const onDelete = async (id: number) => {
        setLoading(true)
        setLoading(false)
    }

    const onChange = async (a:activity, phase: number) => {
        setLoading(true)
        const r = await fetch("/api/activities/" + a.id.toString(), {
            method: 'PUT',
            body: JSON.stringify({...a, currentStep: phase}),
            headers: {
                'content-type': 'application/json'
            }
        })
        await load()
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const s = await getShops().then(r => r.json()); setShops(s)
        const p = await getPlan(parseInt(id)).then(r => r.json()); setPlan(p)
        console.log(p)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    return (
        <div className='flex flex-col page items-center'>
            <div className="large-text mb-5">Chỉnh sửa kế hoạch {plan?.planId}</div>
            <div><button onClick={() => {nav({to:"add_activity"})}}>Thêm hoạt động</button></div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cửa hàng</th>
                        <th>Giai đoạn</th>
                        <th>Thời điểm bắt đầu</th>
                        <th>Thòi điểm kết thúc</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {plan?.activities.map((a) =>
                        <tr key={a.id}>
                            <td>{a.planId}</td>
                            <td>{shops.find((s) => s.id === a.shopId)?.name}</td>
                            <td>{getPhase(a.currentStep)}</td>
                            <td>{new Date(a.startTime).toLocaleString()}</td>
                            <td>{new Date(a.endTime).toLocaleString()}</td>
                            <td>
                                <div className="flex-row flex justify-between">
                                    <div className="flex flex-col justify-center">
                                        <DropdownInput label={"Giai đoạn"}
                                            list={[{ id: 1, name: "Kiểm tra tại cơ sở" },
                                            { id: 2, name: "Lấy mẫu, thực hiện kiểm định" },
                                            { id: 3, name: "Kết luận thanh kiểm tra" },
                                            { id: 4, name: "Xử lý vi phạm" }]}
                                            selectedValue={emptyData} onChange={(e: basicData) => { onChange(a, e.id) }} />
                                    </div>
                                    <button onClick={() => { onDelete(a.id) }}><TrashIcon className="icon" /></button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}