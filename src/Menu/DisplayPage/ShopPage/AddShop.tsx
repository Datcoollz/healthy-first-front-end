import { useEffect, useState } from "react";

import FormInput from "../../Components/FormInput";
import DialogBar from "../../Components/DialogBar";
import { districts } from "../../../Interface/District";
import { emptyShop } from "../../../Interface/Shop";

import { dialogProps } from "../../../Interface/DialogProps";
import { basicData, emptyData } from "../../../Interface/BasicData";
import ComboboxInput from "../../Components/ComboboxInput";
import { useNavigate } from 'react-location';
import { addShop, getDistrict, getDistricts } from '../Tables/TableData';
import Loading from "../Loading";

export default function AddShop(props: dialogProps) {
    const [districts, setDistricts] = useState<districts>([]);
    const [wards, setWards] = useState<basicData[]>([]);
    const [loading, setLoading] = useState(true)
    const [showError, setShowError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const nav = useNavigate();

    const [newShop, setNewShop] = useState(emptyShop);

    const [selectedDistrict, setSelectedDistrict] = useState(emptyData);
    const [selectedWard, setSelectedWard] = useState(emptyData);

    const load = async () => {
        setLoading(true)
        setDistricts(await getDistricts().then(r => r.json()));
        setLoading(false)
    };

    useEffect(() => {load();}, []);

    const changeDistrict = async (d: basicData) => {
        setWards([])
        setSelectedDistrict(d)
        setSelectedWard(emptyData)
        setNewShop({ ...(newShop ?? {}), district: d.id })
        const w = await getDistrict(d.id).then(r => r.json())
        setWards(w.wards)
    }

    const changeWard = (w: basicData) => {
        setNewShop({ ...(newShop ?? {}), ward: w.id })
        setSelectedWard(w)
    }

    const confirm = async () => {
        setShowError(true)
        setLoading(true)
        console.log(newShop)
        const status = await addShop(newShop).then(r => r.status)
        if (status === 200) nav({ to: '../../' })
        else setDataError(true)
        setLoading(false)
    }

    const cancel = () => { nav({ to: '../../' }) }

    if (loading) return (<Loading />)
    return (
        <div id="add" className="flex flex-col items-center justify-center">
            <div>
                <span className="large-text">Th??m c???a h??ng</span>
            </div>
            <form>
                <FormInput label="T??n c???a h??ng" placeholder="c???a h??ng" type="text"
                    value={newShop.name}
                    onChange={(n: string) => setNewShop({
                        ...(newShop ?? {}), name: n
                    })}
                    isError={newShop.name === "" && showError}
                    errorText="H??y ??i???n t??n c???a h??ng"
                />

                <FormInput label="?????a ch???" placeholder="?????a ch???" type="text"
                    value={newShop.address}
                    onChange={(a: string) => setNewShop({
                        ...(newShop ?? {}), address: a
                    })}
                    isError={newShop.address === "" && showError}
                    errorText="H??y ??i???n ?????a ch???"
                />

                <FormInput label="S??? ??i???n tho???i" placeholder="s??? ??i???n tho???i" type="text"
                    value={newShop.phone_number}
                    onChange={(p: string) => setNewShop({
                        ...(newShop ?? {}), phone_number: p
                    })}
                    isError={newShop.phone_number === "" && showError}
                    errorText="H??y ??i???n s??? ??i???n tho???i"
                />

                <ComboboxInput label="Qu???n"
                    list={districts}
                    value={selectedDistrict}
                    onChange={changeDistrict}
                    isError={selectedDistrict === emptyData && showError}
                    errorText="H??y nh???p t??n qu???n"
                />

                <ComboboxInput label="Ph?????ng"
                    list={wards}
                    value={selectedWard}
                    onChange={changeWard}
                    isError={selectedWard === emptyData && showError}
                    errorText="H??y nh???p t??n ph?????ng"
                />

                <label>Ph????ng th???c s???n su???t</label>
                <div className="flex flex-wrap p-2">
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={newShop.is_product}
                            onChange={() => setNewShop({
                                ...(newShop ?? {}), is_product: !newShop.is_product
                            })} />
                        <span>S???n xu???t th???c ph???m</span>
                    </label>
                    <label className="block">
                        <input type="checkbox" className="mr-1"
                            checked={newShop.is_seller}
                            onChange={() => setNewShop({
                                ...(newShop ?? {}), is_seller: !newShop.is_seller
                            })} />
                        <span>D???ch v??? ??n u???ng</span>
                    </label>
                    <span
                        className={(!newShop.is_product && !newShop.is_seller) && showError ?
                            "text-error " :
                            "text-error hidden"
                        }>
                        "H??y ch???n ph????ng th???c s???n xu???t"
                    </span>
                </div>
            </form >
            <div><span className="text-error">{dataError ? "D?? li???u ???? thay ?????i, h??y t???i l???i trang." : ""}</span></div>
            <div>
                <DialogBar onConfirm={confirm} onCancel={cancel} />
            </div>
        </div >
    )
}