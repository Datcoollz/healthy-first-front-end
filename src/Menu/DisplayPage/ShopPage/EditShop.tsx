import { useMatch, useNavigate } from 'react-location';
import { getDistrict, getDistricts, getShop, editShop } from '../Tables/TableData';
import { useState, useEffect } from 'react';
import { districts } from '../../../Interface/District';
import { s, emptyS } from '../../../Interface/Shop';
import Loading from '../Loading';
import FormInput from '../../Components/FormInput';
import { basicData, emptyData } from '../../../Interface/BasicData';
import ComboboxInput from '../../Components/ComboboxInput';
import DialogBar from '../../Components/DialogBar';

export default function EditShop() {
    const { params: { id } } = useMatch()

    const [districts, setDistricts] = useState<districts>([]);
    const [wards, setWards] = useState<basicData[]>([]);
    const [loading, setLoading] = useState(true)
    const [showError, setShowError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const nav = useNavigate();

    const [shop, setShop] = useState<s>(emptyS);

    const [selectedDistrict, setSelectedDistrict] = useState(emptyData);
    const [selectedWard, setSelectedWard] = useState(emptyData);

    const load = async () => {
        setLoading(true)
        setShop(await getShop(parseInt(id)).then(r => r.json()))
        setDistricts(await getDistricts().then(r => r.json()))
        setLoading(false)
    };

    useEffect(() => { load(); }, []);

    const changeDistrict = async (d: basicData) => {
        setWards([])
        setSelectedDistrict(d)
        setSelectedWard(emptyData)
        setShop({ ...(shop ?? {}), district: d.id })
        const w = await getDistrict(d.id).then(r => r.json())
        setWards(w.wards)
    }

    const changeWard = (w: basicData) => {
        setShop({ ...(shop ?? {}), ward: w.id })
        setSelectedWard(w)
    }

    const confirm = async () => {
        setShowError(true)
        setLoading(true)
        const status = await editShop(shop.id, shop).then(r => r.status)
        if (status === 200) nav({ to: '../' })
        else setDataError(true)
        setLoading(false)
    }

    const cancel = () => { nav({ to: '../' }) }

    if (loading) return (<Loading />)
    return (
        <div className='flex flex-col items-center'>
            <span className='large-text mb-5'>Chỉnh sửa: {shop?.name}</span>

            <form>
                <FormInput label="Tên cửa hàng" placeholder="cửa hàng" type="text"
                    value={shop.name}
                    onChange={(n: string) => setShop({
                        ...(shop ?? {}), name: n
                    })}
                    isError={shop.name === "" && showError}
                    errorText="Hãy điền tên cửa hàng"
                />

                <FormInput label="Địa chỉ" placeholder="địa chỉ" type="text"
                    value={shop.address}
                    onChange={(a: string) => setShop({
                        ...(shop ?? {}), address: a
                    })}
                    isError={shop.address === "" && showError}
                    errorText="Hãy điền địa chỉ"
                />

                <FormInput label="Số điện thoại" placeholder="số điện thoại" type="text"
                    value={shop.phone_number}
                    onChange={(p: string) => setShop({
                        ...(shop ?? {}), phone_number: p
                    })}
                    isError={shop.phone_number === "" && showError}
                    errorText="Hãy điền số điện thoại"
                />

                <ComboboxInput label="Quận"
                    list={districts}
                    value={selectedDistrict}
                    onChange={changeDistrict}
                    isError={selectedDistrict === emptyData && showError}
                    errorText="Hãy nhập tên quận"
                />

                <ComboboxInput label="Phường"
                    list={wards}
                    value={selectedWard}
                    onChange={changeWard}
                    isError={selectedWard === emptyData && showError}
                    errorText="Hãy nhập tên phường"
                />

                <label>Phương thức sản suất</label>
                <div className="flex flex-wrap p-2">
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={shop.is_product}
                            onChange={() => setShop({
                                ...(shop ?? {}), is_product: !shop.is_product
                            })} />
                        <span>Sản xuất thực phẩm</span>
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={shop.is_seller}
                            onChange={() => setShop({
                                ...(shop ?? {}), is_seller: !shop.is_seller
                            })} />
                        <span>Dịch vụ ăn uống</span>
                    </label>
                    <span
                        className={(!shop.is_product && !shop.is_seller) && showError ?
                            "text-error " :
                            "text-error hidden"
                        }>
                        "Hãy chọn phương thức sản xuất"
                    </span>
                </div>
            </form >
            <div><span className="text-error">{dataError ? "Dũ liệu đã thay đổi, hãy tải lại trang." : ""}</span></div>
            <div>
                <DialogBar onConfirm={confirm} onCancel={cancel} />
            </div>
        </div>
    )
}