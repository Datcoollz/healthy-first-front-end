import DropdownInput from "./DropdownInput";
import { useNavigate } from "react-location";
import { basicData } from '../../Interface/BasicData';
import { useState } from "react";
import AddButton from "./AddButton";

interface p {
    onAdd: () => void;
}

const list = [
    { id: 0, name: "Cửa hàng", to: "shops" },
    { id: 1, name: "Quận/huyện", to: "districts" },
    { id: 2, name: "Phường/xã/thị trấn", to: "wards" },
    { id: 3, name: "Kế hoạch thanh kiểm tra", to: "plans" }
];

export default function TableDropdown(props: p) {
    const nav = useNavigate();

    return (
        <div className="flex flex-row" id="tableDropdowm">
            <div className="flex flex-col justify-center mx-2">
                <DropdownInput
                    label={"Chọn mục"}
                    list={list}
                    selectedValue={{id:0, name:""}}
                    onChange={(e) => {
                        const navTo = "../../../" + (list.find((o) => o.id === e.id)?.to);
                        nav({ to: navTo, replace: true });
                    }}
                />
            </div>
            <div className='flex flex-col justify-center'>
                <AddButton onClick={props.onAdd} />
            </div>
        </div>
    )
}