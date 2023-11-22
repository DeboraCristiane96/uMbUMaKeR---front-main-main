import ApiService from "../services/ApiService";

export default class SaidaEstoqueService extends ApiService {
    constructor() {
        super('/api/umbumaker/saidaestoque')
    }

    create(obj) {
        return this.post('', obj);
    }
    update(id, obj) {
        return this.patch(`/${id}`, obj);
    }

    delete(id) {
        return super.delete(`/${id}`);
    }

    findById(id) {
        return this.get(`/${id}`);
    }

    find(params) {
        return this.get(`/${params}`);
    }

    findAll() {
        return this.get(``);
    }
}