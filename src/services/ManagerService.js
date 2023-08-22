import ApiService from "../services/ApiService";

export default class ManagerService extends ApiService{
    constructor(){
        super('/api/umbumaker/gestores')
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

    find(params){
        return this.get(`/${params}`);
    }

    findById(id){
        return this.get(`/${id}`);
    }
    findAll(){
        return this.get(``);
    }
}