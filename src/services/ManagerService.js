import ApiService from "../services/ApiService";

export default class ManagerService extends ApiService{
    constructor(){
        super('/api/umbumake/gestores')
    }

    create(obj){
        return this.post('',obj);
    }

    update(id,obj){
        return this.put(`/${id}`,obj);
    }

    delete(id){
        return super.delete(`/${id}`);
    }
     
    find(params){
        return this.get(`${params}`);
    }
    
    findAll(){
        return this.get('');
    }
}