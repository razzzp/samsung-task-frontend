import axios from "axios";


export default class Client{

    _host;

    constructor(host,){
        this._host = host;
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
}