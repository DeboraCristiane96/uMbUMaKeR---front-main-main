import ApiService from "../services/ApiService";

export default class TutorService extends ApiService{
    constructor(){
        super('/api/umbumaker/tutores')
    }

    create(obj){
        return this.post('',obj);
    }
    update(id,obj){
        
        return this.patch(`/${id}`, obj);
    }

    delete(id){
        return this.delete(`/${id}`);
    }
    
    findById(id){
        return this.get(`/${id}`);
    }

    findByName(params){
        return this.get(`/${params}`);
    }

    findAll(){
        return this.get(``);
    }
}