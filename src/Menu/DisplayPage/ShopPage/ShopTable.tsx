import { shops } from "../../../Interface/Shop";
import { districts } from '../../../Interface/District';
import { wards } from '../../../Interface/Ward';
import EditBar from '../Tables/EditBar';
import { useNavigate } from 'react-location';

interface shopListProps {
    shops?: shops;
    districts?: districts;
    wards?: wards;
    onDelete: (id: number) => void;
}

export default function ShopList(props: shopListProps) {
    const nav = useNavigate();
    function onEdit(id: number) { nav({ to: "../../shops/" + id.toString() }) }

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
                        <th>Hạn chứng nhận</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {props?.shops?.map(s => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>{props.districts?.find(w => w.id === s.district)?.name}</td>
                            <td>{props.wards?.find(w => w.id === s.ward)?.name}</td>
                            <td>{s.phone_number}</td>
                            <td>{(s.is_product ? "Sản xuất thực phẩm" : "") +
                                ((s.is_product && s.is_seller) ? " + " : "") +
                                (s.is_seller ? " Dịch vụ ăn uống" : "")}</td>
                            {s.certificates.filter((c) => c.type === 1 && new Date(c.valid_until) > new Date()).length > 0 ?
                                <td>Còn hạn</td> :
                                <td>Hết hạn hoặc bị thu hồi</td>
                            }
                            <td><EditBar
                                onEdit={() => onEdit(s.id)}
                                onDelete={() => { props.onDelete(s.id) }}
                            />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}