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

export default function ProvincePage(){
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
        <main>
            {renderProvinces(provinces)}
        </main>
    );
}

function Table({data, headers}){
    console.log('heres')
    return (
        <table>
            <tr>
                {headers.map((val,i)=>{
                    return(
                        <th key={i}>{val}</th>
                    )
                })}
            </tr>
            {data.map((item)=>{
                return (
                    <tr key={item.id} className="hover:bg-neutral-800">
                        <td>{item.id}</td>
                        <td>
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