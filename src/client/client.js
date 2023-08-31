import axios from "axios";


export function buildClient(){
    return new Client('localhost:5000');
}

export default class Client{

    _host;

    constructor(host,){
        this._host = host;
    }

    async postProvince(province){
        const response = await axios.post(`http://${this._host}/api/v1/provinces`, province);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async getProvinces(){
        const response = await axios.get(`http://${this._host}/api/v1/provinces`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async getProvinceById(id){
        const response = await axios.get(`http://${this._host}/api/v1/provinces/${id}`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async putProvinceById(province){
        const id = province.id;
        const response = await axios.put(`http://${this._host}/api/v1/provinces/${id}`, province);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async deleteProvinceById(id){
        const response = await axios.delete(`http://${this._host}/api/v1/provinces/${id}`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async postKabupaten(kabupaten){
        const response = await axios.post(`http://${this._host}/api/v1/kabupaten`, kabupaten);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async getKabupatens(){
        const response = await axios.get(`http://${this._host}/api/v1/kabupaten`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async getKabupatenById(id){
        const response = await axios.get(`http://${this._host}/api/v1/kabupaten/${id}`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }

    async putKabupatenById(kabupaten){
        const id = kabupaten.id;
        kabupaten.provinceId = Number.parseInt(kabupaten.provinceId);
        kabupaten.province= undefined;
        const response = await axios.put(`http://${this._host}/api/v1/kabupaten/${id}`, kabupaten);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }
    async deleteKabupatedById(id){
        const response = await axios.delete(`http://${this._host}/api/v1/kabupaten/${id}`);
        // const response = await fetch(`http://${this._host}/api/v1/provinces`, {mode:"no-cors"});
        return response.data;
    }
}