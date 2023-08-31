"use client"
import Client from "@/client/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buildClient } from "@/client/client";
import { ButtonPrimary } from "@/components/form";
import { useRouter } from "next/navigation";

function renderKabupaten(provinces){
    if(!provinces){
        return "Loading..."
    } else {
        if(Array.isArray(provinces)){
            return <ProvinceTable data={provinces} headers={['Id', 'Nama Kabupaten']}></ProvinceTable>
        } else {
            return "Error loading kabupaten"
        }
    }
}

export default function KabupatenTablePage({params}){
    let [kabupatens, setKabupatens] = useState();
    const router = useRouter();
    const create = () =>{
        router.push('/kabupaten/new');
    };

    useEffect(()=>{
        async function fetchKabupatens(){
            const client = buildClient();
            try{
                const kabupaten = await client.getKabupatens();
                setKabupatens(kabupaten);
            } catch(e) {
                console.error(e);
            }
        };
        if(!kabupatens) fetchKabupatens();
    })
    return (
        <main className="flex w-full justify-center">
            <div className="w-3/4 flex flex-col gap-y-2">
                <div className="w-full">
                    <ButtonPrimary onClick={create}>New</ButtonPrimary>
                </div>
                <div className="w-full">
                    {renderKabupaten(kabupatens)}
                </div>
            </div>
        </main>
    );
}

function ProvinceTable({data, headers}){
    return (
        <table className="border border-neutral-500 border-collapse bg-neutral-600 w-3/4 rounded-md">
            <colgroup>
                <col span={1} className="w-1/4"/>
                <col span={1} className="w-3/4"/>
            </colgroup>
            <tr className="bg-neutral-800">
                <th className="py-3 border-y border-slate-500" key={1}>Id</th>
                <th className="text-left border-y border-slate-500" key={2}>Kabupaten</th>
            </tr>
            {data.map((item)=>{
                return (
                    <tr key={item.id} className="hover:bg-neutral-700">
                        <td className="py-2 text-center border-y border-slate-500">{item.id}</td>
                        <td className="border-y  border-slate-500">
                            <Link className="block" href={`/kabupaten/${item.id}`} key={item.id}>
                                {item.name}
                            </Link>
                        </td>
                    </tr>
                )
            })}
        </table>
    )
}