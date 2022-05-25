import { useEffect, useState, Fragment } from "react";
import DialogBar from "../Menu/DialogBar";
import FormInput from "./FormInput";

export default function AddShop(props) {
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const emptyShop =
    {
        name: "",
        address: "",
        ward: 0,
        district: 0,
        phone_number: "",
        is_product: false,
        is_seller: false,
    }
    const [newShop, setNewShop] = useState(emptyShop);

    const load = async () => {
        try {
            const [d, w] = await Promise.all([
                fetch('https://api1.vominhduc.me/api/districts').then(rd => rd.json()),
                fetch('https://api1.vominhduc.me/api/wards').then(rw => rw.json())
            ]);
            setDistricts(d);
            setWards(w);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const confirm = () => {
        fetch('https://api1.vominhduc.me/api/shops/create', {
            method: 'POST',
            body: JSON.stringify(newShop),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(() => { setNewShop(emptyShop) })
            .then(props.onConfirm())
    }

    const cancel = () => {
        setNewShop(emptyShop);
        props.onCancel();
    }

    return (
        <div id="add" className="flex flex-col h-screen w-screen items-center justify-center">
            <form>
                <FormInput label="Tên cửa hàng" placeholder="cửa hàng"
                    value={newShop.name}
                    onChange={(e) => setNewShop({
                        ...(newShop ?? {}), name: e.target.value
                    })}
                />

                <FormInput label="Địa chỉ" placeholder="địa chỉ"
                    value={newShop.address}
                    onChange={(e) => setNewShop({
                        ...(newShop ?? {}), address: e.target.value
                    })}
                />

                <FormInput label="Số điện thoại" placeholder="số điện thoại"
                    value={newShop.phone_number}
                    onChange={(e) => setNewShop({
                        ...(newShop ?? {}), phone_number: e.target.value
                    })}
                />

                <label>Phương thức sản suất</label>
                <div className="flex flex-wrap border-2 rounded border-slate-600 p-2">
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={newShop.is_product}
                            onChange={() => setNewShop({
                                ...(newShop ?? {}), is_product: !newShop.is_product
                            })} />
                        <span>Sản xuất thực phẩm</span>
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={newShop.is_seller}
                            onChange={() => setNewShop({
                                ...(newShop ?? {}), is_seller: !newShop.is_seller
                            })} />
                        <span>Dịch vụ ăn uống</span>
                    </label>
                </div>

                <div className="flex items-center">
                    <div className="w-1/3">
                        <label htmlFor="district-combobox">Quận</label>
                    </div>
                    <div className="w-2/3">

                    </div>
                </div>

                <DialogBar onConfirm={confirm} onCancel={cancel}/>
            </form >
        </div >
    )
}