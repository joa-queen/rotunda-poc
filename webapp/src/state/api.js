import axios from 'axios';

const { API } = process.env;

class Api {
  constructor() {
    if (!Api.instance) {
      this.baseURL = API || 'http://localhost:8080/';
      this.req = axios.create({
        baseURL: this.baseURL,
      });

      Api.instance = this;
    }

    return Api.instance;
  }
}


export default new Api();
