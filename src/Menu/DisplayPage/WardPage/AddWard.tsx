import { useState, useEffect } from "react";
import FormInput from "../../Components/FormInput";
import ComboboxInput from "../../Components/ComboboxInput";
import DialogBar from "../../Components/DialogBar";
import { districts } from "../../../Interface/District";
import { basicData, emptyData } from "../../../Interface/BasicData";
import { useNavigate } from 'react-location';
import { addWard, getDistricts} from "../Tables/TableData"
import Loading from "../Loading";


export default function AddWard() {
    const [districts, setDistricts] = useState<districts>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<basicData>(emptyData)
    const [newWard, setNewWard] = useState("")
    const [loading, setLoading] = useState(true)
    const [showError, setShowError] = useState(false)
    const [dataError, setDataError] = useState(false)
    const nav = useNavigate();

    const load = async () => {
        setLoading(true)
        const d = await getDistricts().then(r => r.json())
        setDistricts(d)
        setLoading(false)
    };

    useEffect(() => { load() }, []);

    const confirm = async () => {
        setLoading(true)
        if (newWard !== '' && selectedDistrict !== emptyData) {
            const status = await addWard(newWard, selectedDistrict.id).then(r => r.status)
            if (status === 200) nav({ to: "../../" })
            else setDataError(true)
        }
        else {
            setShowError(true)
        }
        setLoading(false)
    }
    const cancel = () => { nav({ to: "../../" }) }

    if (loading) return (<Loading />)
    return (
        <div className="flex flex-col items-center">
            <form>
                <FormInput label="Tên phường" placeholder="phường" type="text"
                    value={newWard}
                    onChange={(val: string) => setNewWard(val)}
                    isError={showError}
                    errorText="Hãy nhập tên phường"
                />
                <ComboboxInput label="Thuộc quận"
                    list={districts}
                    value={selectedDistrict}
                    onChange={setSelectedDistrict}
                    isError={showError}
                    errorText="Hãy nhập tên quận"
                />
            </form>
            <div className="text-error">{dataError ? "Dữ liệu đã thay đổi, hãy tải lại trang." : ""}</div>
            <DialogBar onConfirm={confirm} onCancel={cancel} />
        </div >
    );
}