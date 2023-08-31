"use client"
import Client from "@/client/client";
import { ButtonPrimary } from "@/components/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buildClient } from "@/client/client";
import { useRouter } from "next/navigation";

function renderProvinces(provinces){
    if(!provinces){
        return "Loading..."
    } else {
        if(Array.isArray(provinces)){
            return <ProvinceTable data={provinces} headers={['Id', 'Nama Propinsi']}></ProvinceTable>
        } else {
            return "Error loading provinces"
        }
    }
}

export default function ProvinceTablePage(){
    let [provinces, setProvinces] = useState();
    const router = useRouter();
    const create = () =>{
        router.push('/propinsi/new');
    };

    useEffect(()=>{
        async function fetchProvinces(){
            const client = buildClient();
            try{
                const provinces = await client.getProvinces();
                setProvinces(provinces);
            } catch(e) {
                console.error(e);
            }
        };
        if(!provinces) fetchProvinces();
    })
    return (
        <main className="flex w-full justify-center">
            <div className="w-3/4 flex flex-col gap-y-2">
                <div className="w-full">
                    <ButtonPrimary onClick={create}>New</ButtonPrimary>
                </div>
                <div className="w-full">
                    {renderProvinces(provinces)}
                </div>
            </div>
        </main>
    );
}

function ProvinceTable({data, headers}){
    return (
        <table className="border border-neutral-500 border-collapse bg-neutral-600 w-full rounded-md">
            <colgroup>
                <col span={1} className="w-1/4"/>
                <col span={1} className="w-3/4"/>
            </colgroup>
            <tr className="bg-neutral-800">
                <th className="py-3 border-y border-slate-500" key={1}>Id</th>
                <th className="text-left border-y border-slate-500" key={2}>Propinsi</th>
            </tr>
            {data.map((item)=>{
                return (
                    <tr key={item.id} className="hover:bg-neutral-700">
                        <td className="py-2 text-center border-y border-slate-500">{item.id}</td>
                        <td className="border-y  border-slate-500">
                            <Link className="block" href={`/propinsi/${item.id}`} key={item.id}>
                                {item.name}
                            </Link>
                        </td>
                    </tr>
                )
            })}
        </table>
    )
}