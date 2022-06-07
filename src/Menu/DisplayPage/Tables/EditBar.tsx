import { PencilIcon, TrashIcon } from "@heroicons/react/solid"

interface editBarProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function EditBar(props : editBarProps) {
    return (
        <div className="flex flex-row justify-between">
            <button type="button" onClick={props.onEdit}><PencilIcon className="icon" /></button>
            <button type="button" onClick={props.onDelete}><TrashIcon className="icon" /></button>
        </div>
    )
}