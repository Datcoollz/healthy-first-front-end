import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { dialogProps } from "../../Interface/DialogProps";

export default function DialogBar(props: dialogProps) {
    return (
        <div className="flex flex-row justify-center">
            <button type="button" className="!mx-0 flex-grow !rounded-l-md !border-r-0 !rounded-r-none"
                onClick={props.onConfirm}>
                <div>
                    <CheckIcon className="icon m-auto" />
                </div>
            </button>
            <button type="button" className="!mx-0 flex-grow !rounded-r-md !border-l-0 !rounded-l-none"
                onClick={props.onCancel}>
                <div>
                    <XIcon className="icon m-auto" />
                </div>
            </button>
        </div>
    );
}