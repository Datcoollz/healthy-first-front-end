import { useState, useEffect } from 'react';
import { shop } from '../../../Interface/Shop';
import { certificate, certificates } from '../../../Interface/Certificates';
import { useMatch, useNavigate } from 'react-location';
import { district, emptyDistrict } from '../../../Interface/District';
import { ward, emptyWard } from '../../../Interface/Ward';
import { getCertificates, getShop, getDistrict, getWard } from '../Tables/TableData';
import { ChevronLeftIcon, PencilIcon, PlusIcon } from '@heroicons/react/solid';
import { emptyShop } from '../../../Interface/Shop';
import Loading from '../Loading';

const CERT_PER_PAGE = 50;

export default function EditShopPage() {
    const { params: { id } } = useMatch()
    const shop_id = parseInt(id)
    const nav = useNavigate()

    const [shop, setShop] = useState<shop>(emptyShop)
    const [district, setDistrict] = useState<district>(emptyDistrict)
    const [ward, setWard] = useState<ward>(emptyWard)
    const [certs, setCerts] = useState<certificates>([])

    const [shopLoading, setShopLoading] = useState(true)
    const [certTableLoading, setCertTableLoading] = useState(true)

    const getBusinessTypeString = () => {
        const s =
            [shop.is_product && "Sản xuất thực phẩm",
            shop.is_seller && "Dịch vụ ăn uống"].filter(Boolean).join(' + ')
        return (s ? "Loại hình kinh doanh: " + s : "")
    }

    const getDateString = (cert: certificate) => {
        if(cert.type === 2 || new Date(cert.valid_until) < new Date()) return "Đã hết hạn"
        return cert.valid_until ? new Date(cert.valid_until).toLocaleString() : "Không có hạn";
    }

    const toAddCert = () => { nav({ to: "add_certificate" }) }

    const loadShop = async () => {
        setShopLoading(true)
        const s = await getShop(shop_id).then(r => r.json()); setShop(s)
        const d = await getDistrict(s.district).then(r => r.json()); setDistrict(d)
        const w = await getWard(s.ward).then(r => r.json()); setWard(w)
        setShopLoading(false)
    }

    const loadCertTable = async (cert_page: number) => {
        setCertTableLoading(true)
        const c = await getCertificates(shop_id, cert_page, CERT_PER_PAGE).then(r => r.json()); setCerts(c)
        setCertTableLoading(false);
    }

    const load = async (cert_page: number) => { loadShop(); loadCertTable(cert_page) }

    useEffect(() => { load(0) }, [])

    return (
        <div className='flex flex-col page'>
            <div className='flex flex-row mb-5'>
                <div className='p-5 border-4 shadow-lg border-slate-400 rounded flex-grow block'>
                    {shopLoading ?
                        <Loading />
                        :
                        <>
                            <div className='large-text'>{shop.name}</div>
                            <div>{shop.address ? "Địa chỉ: " + shop.address : ""}</div>
                            <div>{district.name ? "Quận: " + district.name : ""}</div>
                            <div>{ward.name ? "Huyện: " + ward.name : ""}</div>
                            <div>{getBusinessTypeString()}</div>
                        </>
                    }
                </div>
                <div className='flex flex-col justify-between'>
                    <button onClick={() => { nav({ to: "../../" }) }}><ChevronLeftIcon className='icon' /></button>
                    {!shopLoading ? <button onClick={() => { nav({ to: "edit" }) }}><PencilIcon className='icon' /></button> : <div></div>}
                </div>
            </div>
            {certTableLoading ?
                <Loading />
                :
                <>
                    <div className="flex flex-row">
                        <div className='font-bungee text-2xl text-slate-600 flex flex-col justify-center'>Giấy chứng nhận</div>
                        <div><button type="button" className='!my-0' onClick={toAddCert}><PlusIcon className="icon" /></button></div>
                    </div>
                    <table className='my-5'>
                        <thead>
                            <th>Mã chứng nhận</th>
                            <th>Thời gian cấp</th>
                            <th>Hạn tới</th>
                        </thead>
                        <tbody>
                            {certs?.map(c => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{new Date(c.time).toLocaleString()}</td>
                                    <td>{getDateString(c)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>}
        </div>
    )
}