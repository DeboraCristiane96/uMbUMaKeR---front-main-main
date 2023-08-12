import ApiService from "../services/ApiService";

export default class TutorService extends ApiService{
    constructor(){
        super('/api/umbumake/tutores')
    }

    create(obj){
        return this.post('',obj);
    }

    update(id,obj){
        return this.put(`/${id}`,obj);
    }

    delete(id){
        return this.delete(`/${id}`);
    }
    
    findById(id){
        return this.find(`/${id}`);
    }

    findAll(){
        return this.get('');
    }
}