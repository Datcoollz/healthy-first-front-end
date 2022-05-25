export default function FormInput(props) {
    return (
        <label className="p-0">
            <span>{props.label}</span>
            <input type="text" placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => { props.onChange(e.target.value) }} />
            <span
                className={props.isError ?
                    "text-red-500 " :
                    "text-red-500 hidden"
                }>
                {props.errorText}
            </span>
        </label>
    );
}