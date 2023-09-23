import ApiService from "../services/ApiService";

export default class TutorService extends ApiService{
    constructor(){
        super('/api/umbumaker/insumo')
    }
    
    create(obj) {
        return this.post("", obj);
      }
    
      update(id, obj) {
        return this.patch(`/${id}`, obj);
      }
    
      delete(id) {
        return super.delete(`/${id}`);
      }
    
      find(params) {
        return this.get(`${params}`);
      }
      findAll() {
        return this.get(``);
      }
}