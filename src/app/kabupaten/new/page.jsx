"use client"
import { buildClient } from "@/client/client";
import { KabupatenFormFields, updateProvinceId } from "../[id]/page";
import { ButtonPrimary, ButtonSecondary } from "@/components/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildProvinceDict } from "../[id]/page";
import { useEffect } from "react";

export function validateKabupaten(kabupaten){
    const re = /^[a-zA-Z1-9\s]+$/;
    if(!kabupaten.name || typeof kabupaten.name !== 'string' || !re.test(kabupaten.name)){
        throw new Error('name should be a string with not numbers/symbols')
    }
    kabupaten.province = undefined;
    return {...kabupaten};
}

export default function KabupatenNewPage(){
    return (
        <main className="flex flex-col items-center w-full space-y-2">
            <div className="w-3/4">
                <KabupatenNewForm kabupaten={{name:"", province :{name:""}}}/>
            </div>
        </main>
    )
}

export function KabupatenNewForm({kabupaten}){
    
    let [curKabupaten, setKabupaten] = useState(kabupaten);
    let router = useRouter();
    let [provinceDict, setProvinceDict ]= useState();
    useEffect(()=>{
        async function getProvinceDict(){
            try{
                const newProvDict = await buildProvinceDict();
                setProvinceDict(newProvDict);
            } catch(e) {
                alert(`Error: ${e}`)
                console.error(e);
            }   
        }
        if (!provinceDict) getProvinceDict();
    });
    const onFieldChange = (event) => {
        const newState = {
            ...curKabupaten,
        };
        newState[event.target.name] = event.target.value;
        setKabupaten(newState);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        try{
            let validKabupaten = updateProvinceId(curKabupaten, provinceDict);
            validKabupaten =  validateKabupaten(curKabupaten);
            const client = new buildClient();
            const newKab = await client.postKabupaten(curKabupaten);
            router.push(`/kabupaten/${newKab.id}`);
        } catch(e) {
            alert(`failed to create: ${e}`)
            console.error(e);
        }
    };
    const cancel = ()=>{
        router.push('/kabupaten');
    }
    return(
        <form onSubmit={onSubmit} noValidate>
            <div className="w-full text-center">New Kabupaten</div>
            <div className="flex flex-col w-full gap-y-4">
                <KabupatenFormFields kabupaten={curKabupaten} provinceDict={provinceDict} onChange={onFieldChange}/>
                <div className="flex flex-row justify-end space-x-6">
                    <ButtonPrimary type="submit">Save</ButtonPrimary>
                    <ButtonSecondary type="button" onClick={cancel}>Cancel</ButtonSecondary>
                </div>
            </div>
        </form>
    )
}