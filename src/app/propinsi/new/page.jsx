"use client"
import { buildClient } from "@/client/client";
import { ProvinceFormFields } from "../[id]/page";
import { ButtonPrimary, ButtonSecondary } from "@/components/form";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function validateProvince(province){
    const re = /^[a-zA-Z1-9\s]+$/;
    if(!province.name || typeof province.name !== 'string' || !re.test(province.name)){
        alert('name should be a string with not numbers/symbols');
        return false;
    }
    return true;
}

export default function ProvinceNewPage(){
    return (
        <main className="flex flex-col items-center w-full space-y-2">
            <div className="w-3/4">
                <ProvinceNewForm province={{name:""}}/>
            </div>
        </main>
    )
}

export function ProvinceNewForm({province}){
    
    let [curProvince, setProvince] = useState(province);
    let router = useRouter();

    const onFieldChange = (event) => {
        const newProvince = {
            ...curProvince,
        };
        newProvince[event.target.name] = event.target.value;
        setProvince(newProvince);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        if (!validateProvince(curProvince)) return;
        try{
            const client = new buildClient();
            const province = await client.postProvince(curProvince);
            router.push(`/propinsi/${province.id}`);
        } catch(e) {
            alert('failed to create')
            console.error(e);
        }
    };
    const cancel = ()=>{
        router.push('/propinsi');
    }
    return(
        <form onSubmit={onSubmit} noValidate>
            <div className="w-full text-center">New Province</div>
            <div className="flex flex-col w-full gap-y-4">
                <ProvinceFormFields province={curProvince} onChange={onFieldChange}/>
                <div className="flex flex-row justify-end space-x-6">
                    <ButtonPrimary type="submit">Save</ButtonPrimary>
                    <ButtonSecondary type="button" onClick={cancel}>Cancel</ButtonSecondary>
                </div>
            </div>
        </form>
    )
}