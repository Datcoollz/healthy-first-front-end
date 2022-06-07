import { shops } from '../../../Interface/Shop';
import { wards } from '../../../Interface/Ward';
import EditBar from '../Tables/EditBar';
import { districts } from '../../../Interface/District';
import { useNavigate } from 'react-location';

interface wardListProps {
    shops: shops;
    districts: districts;
    wards: wards;
    onDelete: (id: number) => void;
}

export default function WardList(props: wardListProps) {
    const nav = useNavigate()
    return (
        <div className="flex justify-center">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Phường</th>
                        <th>Thuộc quận</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {props.wards.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.name}</td>
                            <td>{props?.districts.find(d => d.id === o.districtId)?.name}</td>
                            <td><EditBar
                                onEdit={() => { nav({to: o.id.toString()}) }}
                                onDelete={() => { props.onDelete(o.id) }}
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}