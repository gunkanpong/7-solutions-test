import BaseAPI from "../api";

const path = "users";

export default class UsersApi extends BaseAPI {
  static findAll(): Promise<any> {
    return this.api.get(path).then((res) => res);
  }
}
