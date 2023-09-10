import ApiService from "./ApiService";

export default class DeviceService extends ApiService {
  constructor() {
    super("/api/umbumaker/Dispositivos");
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
