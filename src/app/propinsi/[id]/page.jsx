"use client"
import { useEffect, useState } from "react"
import Client from "@/client/client"
import { useRouter } from "next/navigation";
import {ButtonPrimary, ButtonSecondary, FormLabelAndField} from "@/components/form";
import { buildClient } from "@/client/client";
import { validateProvince } from "../new/page";

function renderProvince(province){
    if(typeof province === "string"){
        return province;
    }
    else if(!province){
        return "Loading..."
    } else {
        return <ProvinceEditForm province={province}/>
    }
}

export default function ProvinceEditPage({params}){
    let [province, setProvince] = useState();
    useEffect(()=>{
        async function getProvince(){
            const client = buildClient();
            try{
                const province = await client.getProvinceById(params.id);
                setProvince(province);
            } catch(e) {
                console.error(e);
                setProvince("404 not found");
            }
        }
        if(!province) getProvince();
    })
    return (
        <main className="flex flex-col items-center w-full space-y-2">
            <div className="w-3/4">
                {renderProvince(province)}
            </div>
        </main>
    )
}

export function ProvinceEditForm({province}){
    
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
        const client = new buildClient();
        try{
            const province = await client.putProvinceById(curProvince);
            setProvince(province);
            router.push(`/propinsi`);
        } catch(e) {
            alert('failed to update')
            console.error(e);
            router.push(`/propinsi/${curProvince.id}`);
        }
    };
    const deleteObject = async()=> {
        const client = buildClient();
        try{
            const result = await client.deleteProvinceById(curProvince.id);
        } catch(e) {
            alert('failed to delete')
            console.error(e);
        }
        router.push('/propinsi');
    }
    const cancel = ()=>{
        router.push('/propinsi');
    }
    return(
        <form onSubmit={onSubmit} noValidate>
            <div className="w-full text-center">Edit Province</div>
            <div className="flex flex-col w-full gap-y-4">
                <ProvinceFormFields province={curProvince} onChange={onFieldChange}/>
                <div className="flex flex-row justify-end space-x-6">
                    <ButtonPrimary type="submit">Save</ButtonPrimary>
                    <ButtonSecondary type="button" onClick={cancel}>Cancel</ButtonSecondary>
                    <ButtonSecondary type="button" onClick={deleteObject}>Delete</ButtonSecondary>
                </div>
            </div>
        </form>
    )
}

export function ProvinceFormFields({province, onChange}){
    return(
        <>
            { province.id ? 
                <FormLabelAndField label="Id" name="id" value={province.id} type="text" onFieldChange={onChange} disabled={true}/>
                : ""
            }
            <FormLabelAndField label="Name" name="name" value={province.name} type="text" onFieldChange={onChange}/>
            {/* <ButtonGroup aria-label="Basic example">
                <Button type="submit" variant="secondary">Save</Button>
                <Button type="button" variant="secondary">Cancel</Button>
            </ButtonGroup> */}
        </> 
    )
}
