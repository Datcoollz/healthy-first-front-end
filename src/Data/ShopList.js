import React from "react";
import { CogIcon, TrashIcon } from "@heroicons/react/solid";

function ShopTable(props) {
    let EditBar = () => {
        return (
            <div className="flex flex-row">
                <button><CogIcon className="icon" /></button>
                <button><TrashIcon className="icon" /></button>
            </div>
        )
    }

    return (
        <div className="flex justify-center">
            <table className="border-collapse">
                <thead>
                    <tr>
                        <th>Tên cơ sở</th>
                        <th>Địa chỉ</th>
                        <th>Quận</th>
                        <th>Phường</th>
                        <th>Số điện thoại</th>
                        <th>Loại hình kinh doanh</th>
                        <th>Số cấp Giấy chứng nhận</th>
                        <th>Hạn đến</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {props?.shops?.map(s => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>{props.wards.find(w => w.id === s.ward)?.name}</td>
                            <td>{props.districts.find(w => w.id === s.district)?.name}</td>
                            <td>{s.phone_number}</td>
                            <td>{(s.is_product ? "Sản xuất thực phẩm" : "") +
                                ((s.is_product && s.is_seller) ? " + " : "") +
                                (s.is_seller ? " Dịch vụ ăn uống" : "")}</td>
                            <td>{(s.certificates[0].type)}</td>
                            <td>{s.certificates[0].valid_until}</td>
                            <td>{s.certificates[0].type === 1 ? "Còn hạn" :
                                s.certificates[0].type === 2 ? "Bị thu hồi" : "Không"}</td>
                            <td><EditBar /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShopTable;