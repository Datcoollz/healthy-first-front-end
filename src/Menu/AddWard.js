import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import DropdownInput from "./DropdownInput";
import DialogBar from "../Menu/DialogBar";

export default function AddWard(props) {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState();
    const [newWard, setNewWard] = useState("");
    const [showError, setShowError] = useState(false);

    const Warning = () => {
        return showError ? (
            <button className="bg-red-400 hover:bg-red-400 focus:bg-red-400">
                Hãy nhập tên phường
            </button>
        ) : <div></div>;
    }

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

    useEffect(() => { load() }, []);

    const confirm = () => {
        if (newWard === '') {
            setShowError(true);
        }
        else {
            props.onConfirm();
            fetch('https://api1.vominhduc.me/api/wards/create', {
                method: 'POST',
                body: JSON.stringify({ name: newWard, districtId: selectedDistrict?.id }),
                headers: {
                    'content-type': 'application/json'
                }
            })
        }
    }
    const cancel = () => {
        setNewWard("");
        setShowError(true);
        props.onCancel();
    }

    return (
        <div className="flex flex-col items-center">
            <form>
                <FormInput label="Tên phường" placeholder="phường"
                    value={newWard}
                    onChange={(val) => setNewWard(val)} />
                <DropdownInput
                    label="Thuộc quận"
                    list={districts}
                    value={selectedDistrict}
                    onChange={setSelectedDistrict}
                />
            </form>
            <DialogBar onConfirm={confirm} onCancel={cancel} />
        </div >
    );
}