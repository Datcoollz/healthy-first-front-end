import { getShop } from "../Tables/TableData"
import { useMatch, useNavigate } from 'react-location';
import { useState, useEffect } from 'react';
import { shop, emptyShop, s } from '../../../Interface/Shop';
import Loading from "../Loading";
import FormInput from "../../Components/FormInput";
import DialogBar from "../../Components/DialogBar";

export default function AddCertificate() {
    const { params: { id } } = useMatch()
    const shop_id = parseInt(id)
    const [shop, setShop] = useState<shop>(emptyShop)
    const [loading, setLoading] = useState(true)
    const [revoked, setRevoked] = useState(false)
    const [date, setDate] = useState(new Date().toDateString())
    const [time, setTime] = useState("00:00:00")

    const nav = useNavigate();

    const confirm = async () => {
        setLoading(true)
        const r = await fetch("/api/certificates", {
            method: 'POST',
            body: JSON.stringify({
                type: revoked ? 2 : 1,
                shop_id: shop_id,
                valid_until: new Date(date + " " + time).toISOString(),
                shop: {
                    name: shop.name,
                    address: shop.address,
                    ward: shop.ward,
                    district: shop.district,
                    phone_number: shop.phone_number,
                    is_product: shop.is_product,
                    is_seller: shop.is_seller,
                }
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        setLoading(false)
        nav({ to: "../" })
    }

    const load = async () => {
        setLoading(true)
        const s = await getShop(shop_id).then(r => r.json())
        setShop(s)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    if (loading) return (<Loading />)
    if (shop === null) return (<div className="flex flex-row justify-center text-4xl">Cửa hàng không tồn tại hoặc đã bị xóa.</div>)
    return (
        <div className="flex flex-col items-center">
            <span className="large-text mb-5">Thêm chứng nhận cho: {shop?.name}</span>
            <div>
                <form>
                    <label>
                        <span>Trạng thái</span>
                        <div className="flex flex-col justify-start p-2">
                            <label className="block">
                                <input type="radio" name="type" className="mr-2"
                                    checked={!revoked}
                                    onChange={() => { setRevoked(false) }} />
                                <span>Chưa bị thu hồi</span>
                            </label>
                            <label className="block">
                                <input type="radio" name="type" className="mr-2"
                                    checked={revoked}
                                    onChange={() => { setRevoked(true) }} />
                                <span>Đã bị thu hôi</span>
                            </label>
                        </div>
                    </label>
                    {revoked ?
                        <></>
                        :
                        <label className="p-0">
                            <span>Hạn chứng nhận</span>
                            <div className="flex flex-col">
                                <input type="date" className="mb-5" value={date}
                                    onChange={(e) => { setDate(e.target.value) }} />
                                <input type="time" className="mb-5" value={time}
                                    onChange={(e) => { setTime(e.target.value) }} />
                            </div>
                        </label>
                    }
                </form>
            </div>
            <div>
                <DialogBar onConfirm={confirm} onCancel={() => { nav({ to: "../" }) }} />
            </div>
        </div>
    )
}