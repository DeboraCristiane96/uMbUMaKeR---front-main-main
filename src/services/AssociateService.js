import ApiService from "../services/ApiService";

export default class AssociateService extends ApiService{
    constructor(){
        super('/api/umbumake/associados')
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
    
    find(id){
        return this.get(`/${id}`);
    }

    findAll(){
        return this.get(``);
    }
}