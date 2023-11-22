import ApiService from "./ApiService";

export default class ContaAcessoService extends ApiService{
    constructor(){
        super('/api/umbumaker/contasacesso')
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

    findByTipo(tipo){
        return this.getWithFilter(`/${tipo}`);
    }

    find(params){
        return this.get(`/${params}`);
    }

    findAll(){
        return this.get(``);
    }
}