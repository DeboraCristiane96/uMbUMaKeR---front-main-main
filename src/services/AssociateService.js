import ApiService from "../services/ApiService";

export default class AssociateService extends ApiService{
    constructor(){
        super('/api/umbumaker/associados')
    }

    create(obj){
        return this.post('',obj);
    }
    update(id,obj){
        return this.patch(`/${id}`, obj);
    }

    delete(id){
        return super.delete(`/${id}`);
    }
    
    findById(id){
        return this.get(`/${id}`);
    }

    find(params){
        return this.get(`/${params}`);
    }

    findAll(){
        return this.get(``);
    }
}