"use client"
import Client from "@/client/client";
import Link from "next/link";
import { useEffect, useState } from "react";

function renderProvinces(provinces){
    if(!provinces){
        return "Loading..."
    } else {
        if(Array.isArray(provinces)){
            return <Table data={provinces} headers={['Id', 'Nama Propinsi']}></Table>
        } else {
            return "Error loading provinces"
        }
    }
}

export default function ProvinceTablePage(){
    let [provinces, setProvinces] = useState();
    useEffect(()=>{
        async function fetchProvinces(){
            const client = new Client('localhost:5000');
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
            {renderProvinces(provinces)}
        </main>
    );
}

function Table({data, headers}){
    console.log('heres')
    return (
        <table className="border border-slate-500 border-collapse bg-slate-700 w-3/4">
            <colgroup>
                <col span={1} className="w-1/4"/>
                <col span={1} className="w-3/4"/>
            </colgroup>
            <tr className="bg-slate-800">
                <th className="py-3 border-y border-slate-500" key={1}>Id</th>
                <th className="text-left border-y border-slate-500" key={2}>Nama Propinsi</th>
            </tr>
            {data.map((item)=>{
                return (
                    <tr key={item.id} className="hover:bg-neutral-800">
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