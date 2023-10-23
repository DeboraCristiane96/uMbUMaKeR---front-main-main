import axios from "axios";

export default class ApiService {
    constructor(endpoint){

        this.endpoint = endpoint;
        this.httpCliente = axios.create({
            baseURL:'http://localhost:8090'
        });
    }
    post(url, params){
        url = this.buildUrl(url);
        return this.httpCliente.post(url, params);
    }

    put(url, params){
        url = this.buildUrl(url);
        return this.httpCliente.put(url, params);
    }

    delete(url, id){
        url = this.buildUrl(url);
        return this.httpCliente.delete(url , id);
    }

    get(url, id){
        url = this.buildUrl(url);
        return this.httpCliente.get(url, id);
    }

    buildUrl(url){
        return `${this.endpoint}${url}`;
    }
}