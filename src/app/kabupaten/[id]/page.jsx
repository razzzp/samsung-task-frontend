"use client"
import { useEffect, useState } from "react"
import Client from "@/client/client"
import { useRouter } from "next/navigation";
import {ButtonPrimary, ButtonSecondary, FormLabelAndField} from "@/components/form";
import { buildClient } from "@/client/client";

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
function validateKabupaten(kabupaten){
    const re = /^[a-zA-Z\s]+$/;
    if(!kabupaten.name || typeof kabupaten.name !== 'string' || !re.test(kabupaten.name)){
        alert('name should be a string with not numbers/symbols');
        return false;
    }
    return true;
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

function KabupatenForm({kabupaten}){
    
    let [curKabupaten, setKabupaten] = useState(kabupaten);
    let router = useRouter();
    const onFieldChange = (event) => {
        const newKabupaten = {
            ...curKabupaten,
        };
        newKabupaten[event.target.name] = event.target.value;
        setKabupaten(newKabupaten);
    };
    const onSubmit = async(e)=>{
        e.preventDefault();
        if (!validateKabupaten(curKabupaten)) return;
        const client = buildClient();
        try{
            const kabupaten = await client.putKabupatenById(curKabupaten);
            setKabupaten(kabupaten);
        } catch(e) {
            alert('failed to update')
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
                <FormLabelAndField label="Id" name="id" value={curKabupaten.id} type="text" onFieldChange={onFieldChange} disabled={true}/>
                <FormLabelAndField label="Name" name="name" value={curKabupaten.name} type="text" onFieldChange={onFieldChange}/>
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
