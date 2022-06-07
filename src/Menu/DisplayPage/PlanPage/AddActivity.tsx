import { useMatch, useNavigate } from 'react-location';
import { basicData, emptyData } from '../../../Interface/BasicData';
import DropdownInput from "../../Components/DropdownInput"
import { useState, useEffect } from 'react';
import { plan, activity } from '../../../Interface/PlanData';
import { shops } from '../../../Interface/Shop';
import DialogBar from "../../Components/DialogBar";
import { getShops } from '../Tables/TableData';
import ComboboxInput from '../../Components/ComboboxInput';
import Loading from '../Loading';

const phaseList: basicData[] = [
    { id: 1, name: "Kiểm tra tại cơ sở" },
    { id: 2, name: "Lấy mẫu, thực hiện kiểm định" },
    { id: 3, name: "Kết luận thanh kiểm tra" },
    { id: 4, name: "Xử lý vi phạm" }
]

export default function AddActivity() {
    const { params: { id } } = useMatch()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    const [selectedPhase, setSelectedPhase] = useState(phaseList[0])
    const [shops, setShops] = useState<shops>([])
    const [selectedShop, setSelectedShop] = useState<basicData>(emptyData)
    const [plan, setPlan] = useState<plan>()
    const [date, setDate] = useState(new Date().toDateString())
    const [time, setTime] = useState("00:00:00")

    const onConfirm = async () => {
        setLoading(true)
        const r = await fetch("/api/activities/create", {
            method: 'POST',
            body: JSON.stringify({
                planId: plan?.planId,
                shopId: selectedShop.id,
                result: false,
                startTime: new Date().toISOString(),
                endTime: new Date(date + " " + time).toISOString()
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        nav({to:"../../"})
        setLoading(false)
    }

    const load = async () => {
        setLoading(true)
        const [p,s] = await Promise.all([
            fetch("/api/plans/" + id, { method: 'GET' }).then(r => r.json()),
            getShops().then(r => r.json())
        ])
        setPlan(p)
        setShops(s)
        setSelectedShop(s[0])
        setLoading(false)
    }

    useEffect(() => { load() }, [])
    if(loading) return (<Loading/>)
    return (
        <div className="flex flex-col items-center">
            <div className="large-text mb-5">Thêm hoạt động cho kế hoạch</div>
            <form>
                <ComboboxInput label={'Cửa hàng'} value={selectedShop} list={shops}
                    onChange={setSelectedShop} isError={false} errorText={''} />
                <DropdownInput label={"Giai đoạn: " + selectedPhase.name}
                    list={phaseList}
                    selectedValue={selectedPhase} onChange={setSelectedPhase} />
                <span>Thời điểm kết thúc</span>
                <div className="flex flex-col">
                    <input type="date" className="mb-5" value={date}
                        onChange={(e) => { setDate(e.target.value) }} />
                    <input type="time" className="mb-5" value={time}
                        onChange={(e) => { setTime(e.target.value) }} />
                </div>
            </form>
            <DialogBar onCancel={(() => { nav({ to: "../" }) })} onConfirm={onConfirm} />
        </div>
    )
}