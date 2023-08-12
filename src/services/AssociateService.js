import ApiService from "../services/ApiService";

export default class AssociateService extends ApiService{
    constructor(){
        super('/api/umbumake/Associados')
    }

    create(obj){
        return this.post('',obj);
    }

    update(id,obj){
        return this.put(`/associados/{id}`,obj);
    }

    delete(id){
        return super.delete(`/associados/{id}`);
    }
    
    find(params){
        return this.get(`${params}`);
    }

    findAll(){
        return this.get('');
    }
}