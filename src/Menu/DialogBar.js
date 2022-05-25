import { CheckIcon, XIcon } from "@heroicons/react/solid";

export default function DialogBar(props) {
    return (
        <div className="">
            <button type="button" className="grow mx-0 rounded-l-md border-r-0 rounded-r-none" onClick={props.onConfirm}>
                <div>
                    <CheckIcon className="icon m-auto" />
                </div>
            </button>
            <button type="button" className="grow mx-0 rounded-r-md border-l-0 rounded-l-none" onClick={props.onCancel}>
                <div>
                    <XIcon className="icon m-auto" />
                </div>
            </button>
        </div>
    );
}