import { useState } from "react";
import DialogBar from "./DialogBar";
import FormInput from "./FormInput.js";

export default function AddDistrict(props) {
    const [newDistrict, setNewDistrict] = useState("");
    const [showError, setShowError] = useState(false);

    const confirm = () => {
        if (newDistrict === "") {
            setShowError(true);
        }
        else {
            console.log("confirm")
            props.onConfirm();
            fetch('https://api1.vominhduc.me/api/districts/create', {
                method: 'POST',
                body: JSON.stringify({ name: newDistrict }),
                headers: {
                    'content-type': 'application/json'
                }
            });
        }
    }

    const cancel = () => {
        setNewDistrict("");
        setShowError(false);
        props.onCancel();
    }

    return (
        <div className="flex flex-col items-center">
            <form>
                <FormInput label="Tên quận" placeholder="quận"
                    vlaue={newDistrict}
                    onChange={(val) => {setNewDistrict(val); console.log(newDistrict)}}
                    isError={showError}
                    errorText="hãy nhập tên quận"
                />
                <DialogBar onConfirm={confirm} onCancel={cancel}/>
            </form>
        </div >
    );
}