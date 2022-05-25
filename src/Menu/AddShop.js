import { useEffect, useState, Fragment } from "react";
import DialogBar from "../Menu/DialogBar";
import FormInput from "./FormInput";

export default function AddShop(props) {
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [query, setQuery] = useState('');

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

    const filteredDistrict =
        query === ''
            ? districts
            : districts.filter((d) => {
                return d.name.toLowerCase().includes(query.toLowerCase());
            });

    return (
        <div id="add" className="flex flex-col h-screen w-screen items-center justify-center">
            <form>
                
                <div className="flex items-center mb-6">
                    <div className="w-1/3">
                        <label htmlFor="name">
                            Tên cửa hàng
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input id="name" type="text" value={newShop.name}
                            onChange={(e) => setNewShop({
                                ...(newShop ?? {}), name: e.target.value
                            })} />
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <div className="w-1/3">
                        <label htmlFor="address">
                            Địa chỉ
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input id="address" type="text" value={newShop.address}
                            onChange={(e) => setNewShop({
                                ...(newShop ?? {}), address: e.target.value
                            })} />
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <div className="w-1/3">
                        <label htmlFor="phone-number">
                            Số điện thoại
                        </label>
                    </div>
                    <div className="w-2/3">
                        <input id="phone-number" type="text" value={newShop.phone_number}
                            onChange={(e) => setNewShop({
                                ...(newShop ?? {}), phone_number: e.target.value
                            })} />
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <label className="block">
                        <input type="checkbox" className="leading-tight mr-2"
                            checked={newShop.is_product}
                            onChange={() => setNewShop({
                                ...(newShop ?? {}), is_product: !newShop.is_product
                            })} />
                        <span>Sản xuất thực phẩm</span>
                    </label>
                    <label className="block">
                        <input type="checkbox" className="leading-tight mr-2"
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

                <DialogBar
                    onConfirm={() => {
                        fetch('https://api1.vominhduc.me/api/shops/create', {
                            method: 'POST',
                            body: JSON.stringify(newShop),
                            headers: {
                                'content-type': 'application/json'
                            }
                        })
                            .then(() => { setNewShop(emptyShop) })
                            .then(props.onConfirm())
                    }}
                    onCancel={() => {
                        setNewShop(emptyShop);
                        props.onCancel();
                    }}
                />
            </form >
        </div >
    )
}