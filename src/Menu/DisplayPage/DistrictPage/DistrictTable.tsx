import { districts } from '../../../Interface/District';
import { shops } from '../../../Interface/Shop';
import { wards } from '../../../Interface/Ward';
import EditBar from '../Tables/EditBar';

interface districtListProps {
    districts: districts;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void
}

export default function DistrictList(props: districtListProps) {
    return (
        <div className="flex justify-center">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Quận</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {props.districts.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.name}</td>
                            <td><EditBar
                                onEdit={() => { props.onEdit(o.id) }}
                                onDelete={() => { props.onDelete(o.id)}}
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}