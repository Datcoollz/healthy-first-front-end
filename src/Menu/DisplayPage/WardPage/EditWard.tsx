import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-location";
import DialogBar from "../../Components/DialogBar";
import FormInput from "../../Components/FormInput";
import Loading from "../Loading";
import { getWard, editWard } from "../Tables/TableData";
import { ward, emptyWard } from '../../../Interface/Ward';

export default function EditWard() {
    const { params: { id } } = useMatch()

    const [ward, setWard] = useState<ward>(emptyWard)
    const [eWard, setEWard] = useState("")
    const [loading, setLoading] = useState(true)
    const [showError, setShowError] = useState(false)
    const [dataError, setDataError] = useState(false)
    const nav = useNavigate();

    const load = async () => {
        setLoading(true)
        const r = await getWard(parseInt(id))
        const w = await r.json()
        setWard(w)
        setEWard(w.name)
        setLoading(false)
    };

    useEffect(() => { load() }, []);

    const confirm = async () => {
        setLoading(true)
        if (eWard !== '') {
            const status = await editWard(parseInt(id), ward.districtId, eWard)
                .then(r => r.status)
            if (status === 200) nav({ to: "../../../wards" })
            else setDataError(true)
        }
        else {
            setShowError(true)
        }
        setLoading(false)
    }
    const cancel = () => { nav({ to: "../../../wards" }) }

    if (loading) return (<Loading />)
    return (
        <div className="flex flex-col items-center">
            <form>
                <FormInput label="Tên phường" placeholder="phường" type="text"
                    value={eWard}
                    onChange={setEWard}
                    isError={showError}
                    errorText="Hãy nhập tên phường"
                />
            </form>
            <div className="text-error">{dataError ? "Dữ liệu đã thay đổi, hãy tải lại trang." : ""}</div>
            <DialogBar onConfirm={confirm} onCancel={cancel} />
        </div >
    );
}