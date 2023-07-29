import HttpClient from "./HttpClient";
import axios from 'axios';

export default class AxiosAdapter implements HttpClient{ 

  async get(url: string, params: any): Promise<any> {
    const { body } = await axios.get(url, {
      params: params
    })

    return body;
  }

  async post(url: string, body: any): Promise<any> {
    const { data } = await axios.post(url, body);
    return data;
  }
}