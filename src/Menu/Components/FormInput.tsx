interface formInputProps {
    placeholder: string;
    label: string;
    value: string;
    onChange: (e : string) => void;
    isError: boolean;
    errorText: string;
    type: string;
}

export default function FormInput(props: formInputProps) {
    return (
        <label className="p-0">
            <span>{props.label}</span>
            <input type={props.type} placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => { props.onChange(e.target.value) }} />
            <span
                className={props.isError ?
                    "text-error" :
                    "text-error !hidden"
                }>
                {props.errorText}
            </span>
        </label>
    );
}