
const inputTextStyle = "w-full py-2 px-4 bg-neutral-600 rounded focus:shadow-outline";
const buttonPrimaryStyle = "bg-sky-600 px-4 py-1 rounded hover:bg-sky-500";
const buttonSecondaryStyle = "bg-neutral-500 px-4 py-1 rounded hover:bg-neutral-400";

export function FormLabelAndField({label, name, value, type, disabled, onFieldChange}){
    return (
        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 sm:gap-x-2">
            <div className="sm:text-right align-middle sm:w-1/4 w-full">
                <label htmlFor={name} className="text-clip">{label} :</label>
            </div>
            <div className=" w-full sm:w-3/4 align-middle">
                {
                    disabled ? 
                    <input className={inputTextStyle} type={type} name={name} value={value} onChange={onFieldChange} disabled></input>
                    : <input className={inputTextStyle} type={type} name={name} value={value} onChange={onFieldChange}></input>
                }
                
            </div>
        </div>
    );
}

export function ButtonPrimary({type, onClick, children}){
    return(
        <button className={buttonPrimaryStyle} type={type} onClick={onClick}>{children}</button>
    );
}

export function ButtonSecondary({type, onClick, children}){
    return(
        <button className={buttonSecondaryStyle} type={type} onClick={onClick}>{children}</button>
    );
}
