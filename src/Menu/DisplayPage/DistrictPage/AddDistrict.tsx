import { useState } from 'react';
import DialogBar from "../../Components/DialogBar";
import FormInput from "../../Components/FormInput";
import { useNavigate } from 'react-location';
import { addDistrict } from '../Tables/TableData';
import Loading from '../Loading';

export default function AddDistrict() {
    const [newDistrict, setNewDistrict] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dataError, setDataError] = useState(false)
    const nav = useNavigate();

    const confirm = async () => {
        setLoading(true)
        if (newDistrict === "") { setShowError(true) }
        else {
            const status = await addDistrict(newDistrict).then(r => r.status)
            if (status === 200) nav({ to: "../../districts" })
            else setDataError(true)
        }
        setLoading(false)
    }

    const cancel = () => { nav({ to: "../../districts" }) }

    if (loading) return (<Loading />)
    return (
        <div className="flex flex-col items-center">
            <form>
                <FormInput label="Tên quận" placeholder="quận" type="text"
                    value={newDistrict}
                    onChange={(val: string) => { setNewDistrict(val) }}
                    isError={showError}
                    errorText="hãy nhập tên quận"
                />
                <div className="text-error">{dataError ? "Dữ liệu đã thay đổi, hãy tải lại trang." : ""}</div>
                <DialogBar onConfirm={confirm} onCancel={cancel} />
            </form>
        </div >
    );
}