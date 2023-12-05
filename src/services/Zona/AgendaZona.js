import ApiService from "../ApiService";

export default class AgendaZona extends ApiService{
    constructor(){
        super('/api/umbumaker/agendaZona')
    }
    
    create(obj){
        return this.post('',obj);
    }
    update(id,obj){
        
        return this.put(`/${id}`, obj);
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