import axios from 'axios';
import HttpClient from '../../application/adapters/HttpClient';

export default class AxiosAdapter implements HttpClient {

  async get(url: string, params: any): Promise<any> {
    try {
      const response = await axios.get(url, { params })
      return response.data;
    } catch (e: any) {
      console.log(`Error on GET for ${url}`, { message: e.message })
      return null;
    }
  }

  async post(url: string, body: any): Promise<any> {
    try {
      const response = await axios.post(url, body)
      return response.data;
    } catch (e: any) {
      console.log(`Error on POST for ${url}`, { message: e.message })
      return null;
    }
  }
}