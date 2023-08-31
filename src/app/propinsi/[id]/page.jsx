"use client"
import { useEffect, useState } from "react"
import Client from "@/client/client"
import { Button, ButtonGroup } from "react-bootstrap";

const inputTextStyles = "py-2 px-4 bg-neutral-600 rounded focus:shadow-outline";

function renderProvince(province){
    if(!province){
        return "Loading..."
    } else {
        return <ProvinceForm province={province}/>
    }
}
function validateProvince(province){

}

export default function ProvinceEditPage({params}){
    let [province, setProvince] = useState();
    useEffect(()=>{
        async function getProvince(){
            const client = new Client('localhost:5000');
            try{
                const province = await client.getProvinceById(params.id);
                setProvince(province);
            } catch(e) {
                console.error(e);
            }
        }
        if(!province) getProvince();
    })
    return (
        <main className="flex justify-center w-full">
            <div>
                {renderProvince(province)}
            </div>
        </main>
    )
}

function ProvinceForm({province}){
    
    let [curProvince, setProvince] = useState(province);
    const onFieldChange = (event) => {
        const newProvince = {
            ...curProvince,
        };
        newProvince[event.target.name] = event.target.value;
        setProvince(newProvince);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        const client = new Client('localhost:5000');
        try{
            const province = await client.putProvinceById(curProvince);
            setProvince(province);
        } catch(e) {
            console.error(e);
        }
    };
    return(
        <form onSubmit={onSubmit} noValidate>
            <div className="flex flex-col w-full gap-y-4">
                <FormLabelAndField label="Id" name="id" value={curProvince.id} type="text" onFieldChange={onFieldChange} disabled={true}/>
                <FormLabelAndField label="Name" name="name" value={curProvince.name} type="text" onFieldChange={onFieldChange}/>
                {/* <ButtonGroup aria-label="Basic example">
                    <Button type="submit" variant="secondary">Save</Button>
                    <Button type="button" variant="secondary">Cancel</Button>
                </ButtonGroup> */}
                <div className="flex flex-row justify-end space-x-6">
                    <button type="submit">Save</button>
                    <button type="button">Cancel</button>
                </div>
            </div>
        </form>
    )
}

function FormLabelAndField({label, name, value, type, disabled, onFieldChange}){
    return (
        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 sm:gap-x-2">
            <div className="sm:text-right align-middle w-1/4">
                <label htmlFor={name}>{label} :</label>
            </div>
            <div className="w-3/4 align-middle">
                {
                    disabled ? 
                    <input className={inputTextStyles} type={type} name={name} value={value} onChange={onFieldChange} disabled></input>
                    : <input className={inputTextStyles} type={type} name={name} value={value} onChange={onFieldChange}></input>
                }
                
            </div>
        </div>
    );
}

