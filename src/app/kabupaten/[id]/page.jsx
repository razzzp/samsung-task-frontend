"use client"
import { useEffect, useState } from "react"
import Client from "@/client/client"
import { useRouter } from "next/navigation";
import {ButtonPrimary, ButtonSecondary, FormLabelAndField} from "@/components/form";
import { buildClient } from "@/client/client";
import { validateKabupaten } from "../new/page";
import { useRef } from "react";

function renderKabupaten(kabupaten){
    if(typeof kabupaten === "string"){
        return kabupaten;
    }
    else if(!kabupaten){
        return "Loading..."
    } else {
        return <KabupatenForm kabupaten={kabupaten}/>
    }
}

export default function KabupatenEditPage({params}){
    let [kabupaten, setKabupaten] = useState();
    useEffect(()=>{
        async function getKabupaten(){
            const client = buildClient();
            try{
                const province = await client.getKabupatenById(params.id);
                setKabupaten(province);
            } catch(e) {
                console.error(e);
                setKabupaten("404 not found");
            }
        }
        if(!kabupaten) getKabupaten();
    })
    return (
        <main className="flex flex-col items-center w-full space-y-2">
            <div className="w-3/4">
                {renderKabupaten(kabupaten)}
            </div>
        </main>
    )
}

export function updateProvinceId(kabupaten, provinceDict){
    if(!provinceDict) return kabupaten;
    const id = provinceDict[getProvinceName(kabupaten)];
    if(!id) throw new Error('province does not exist');
    kabupaten.provinceId = id;
    return {...kabupaten};
}

export async function buildProvinceDict(){
    const client = buildClient();
    const provinces = await client.getProvinces();
    if (!Array.isArray(provinces)) throw new Error('failed to retrieve provinces');
    const newProvDict = {};
    provinces.forEach((prov)=>{
        newProvDict[prov.name] = prov.id;
    });
    return newProvDict; 
}

function KabupatenForm({kabupaten}){
    
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
        const newKabupaten = {
            ...curKabupaten,
        };
        newKabupaten[event.target.name] = event.target.value;
        setKabupaten(newKabupaten);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        
        const client = buildClient();
        try{
            let validKabupaten = updateProvinceId(curKabupaten, provinceDict);
            validKabupaten =  validateKabupaten(curKabupaten);
            const updatedKabupaten = await client.putKabupatenById(validKabupaten);
            setKabupaten(updatedKabupaten);
            router.push(`/kabupaten`);
        } catch(e) {
            alert(`failed to update ${e}`)
            console.error(e);
            router.push(`/kabupaten/${curKabupaten.id}`);
        }
    };
    const deleteObject = async()=> {
        const client = buildClient();
        try{
            const result = await client.deleteKabupatedById(curKabupaten.id);
        } catch(e) {
            alert('failed to delete')
            console.error(e);
        }
        router.push('/kabupaten');
    }
    const cancel = ()=>{
        router.push('/kabupaten');
    }
    return(
        <form onSubmit={onSubmit} noValidate>
            <div className="w-3/4 text-center">Edit Province</div>
            <div className="flex flex-col w-full gap-y-4">
                <KabupatenFormFields kabupaten={curKabupaten} provinceDict={provinceDict}  onChange={onFieldChange}/>
                {/* <ButtonGroup aria-label="Basic example">
                    <Button type="submit" variant="secondary">Save</Button>
                    <Button type="button" variant="secondary">Cancel</Button>
                </ButtonGroup> */}
                <div className="flex flex-row justify-end space-x-6">
                    <ButtonPrimary type="submit">Save</ButtonPrimary>
                    <ButtonSecondary type="button" onClick={cancel}>Cancel</ButtonSecondary>
                    <ButtonSecondary type="button" onClick={deleteObject}>Delete</ButtonSecondary>
                </div>
            </div>
        </form>
    )
}

export function getProvinceName(kabupaten){
    let prov;
    if(typeof kabupaten.province === 'string'){
        prov = kabupaten.province;
    } else {
        prov = kabupaten.province.name;
    }
    return prov;
}

export function KabupatenFormFields({kabupaten, provinceDict, onChange}) {
    return (
        <>
        {
            kabupaten.id?
                <FormLabelAndField label="Id" name="id" value={kabupaten.id} type="text" onFieldChange={onChange} disabled={true}/>
                : ""

        }
        <FormLabelAndField label="Name" name="name" value={kabupaten.name} type="text" onFieldChange={onChange}/>
        <FormLabelAndField label={"Province"} name="province" value={getProvinceName(kabupaten)} type="text" list="provinces" onFieldChange={onChange} />
            <datalist id="provinces">
                {
                    provinceDict ?
                    Object.entries(provinceDict).map(([province, id])=>{
                        return (<option key={id} value={province}></option>)
                    }) : ""
                }
            </datalist>
        {/* <ButtonGroup aria-label="Basic example">
            <Button type="submit" variant="secondary">Save</Button>
            <Button type="button" variant="secondary">Cancel</Button>
        </ButtonGroup> */}
        </>
    )
}
