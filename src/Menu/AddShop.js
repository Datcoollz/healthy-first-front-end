import { useEffect, useState } from "react";

import FormInput from "./FormInput";
import DialogBar from "../Menu/DialogBar";
import DropdownInput from "./DropdownInput";

export default function AddShop(props) {
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState();


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
            const [d] = await Promise.all([
                fetch('https://api1.vominhduc.me/api/districts').then(rd => rd.json()),
            ]);
            setDistricts(d);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const changeDistrict = (d) => {
        setNewShop({
            ...(newShop ?? {}), district: d.id
        })
        fetch('https://api1.vominhduc.me/api/districts/' + d.id.toString())
            .then(rd => rd.json())
            .then(d => setWards(d.wards));
        setSelectedDistrict(d);
    }

    const changeWard = (w) => {
        setNewShop({
            ...(newShop ?? {}), ward: w.id
        })
        setSelectedWard(w);
    }

    const confirm = () => {
        setNewShop({
            ...(newShop ?? {}), district: selectedDistrict, ward: selectedWard
        });
        console.log(newShop);
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
                    onChange={(n) => setNewShop({
                        ...(newShop ?? {}), name: n
                    })}
                />

                <FormInput label="Địa chỉ" placeholder="địa chỉ"
                    value={newShop.address}
                    onChange={(a) => setNewShop({
                        ...(newShop ?? {}), address: a
                    })}
                />

                <FormInput label="Số điện thoại" placeholder="số điện thoại"
                    value={newShop.phone_number}
                    onChange={(p) => setNewShop({
                        ...(newShop ?? {}), phone_number: p
                    })}
                />

                <label>Phương thức sản suất</label>
                <div className="flex flex-wrap p-2">
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

                <DropdownInput label="Quận"
                    list={districts}
                    value={selectedDistrict}
                    onChange={changeDistrict} />

                <DropdownInput label="Phường"
                    list={wards}
                    value={selectedWard}
                    onChange={changeWard}
                />
            </form >
            <DialogBar onConfirm={confirm} onCancel={cancel} />
        </div >
    )
}