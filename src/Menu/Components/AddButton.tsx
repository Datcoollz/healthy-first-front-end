import { PlusIcon } from "@heroicons/react/solid"

interface addButtonProps {
    onClick: () => void;
}

export default function AddButton(props : addButtonProps) {
    return (
        <div>
            <button type="button" onClick={props.onClick}>
                <PlusIcon className="icon"/>
            </button>
        </div>
    )
}