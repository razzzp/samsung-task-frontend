
export const labelStyles = "sm:text-right align-middle sm:w-1/4 w-full"
export const inputTextStyle = "w-full py-2 px-4 bg-neutral-600 rounded focus:shadow-outline";
export const buttonPrimaryStyle = "bg-sky-600 px-4 py-1 rounded hover:bg-sky-500";
export const buttonSecondaryStyle = "bg-neutral-500 px-4 py-1 rounded hover:bg-neutral-400";

export function FormLabelAndField({label, name, value, type, disabled, onFieldChange, list}){
    return (
        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 sm:gap-x-2">
            <div className={labelStyles}>
                <label htmlFor={name}>{label} :</label>
            </div>
            <div className=" w-full sm:w-3/4 align-middle">
                {
                    disabled ? 
                    <input className={inputTextStyle} type={type} name={name} value={value} onChange={onFieldChange} list={list} disabled></input>
                    : <input className={inputTextStyle} type={type} name={name} value={value} onChange={onFieldChange} list={list}></input>
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
