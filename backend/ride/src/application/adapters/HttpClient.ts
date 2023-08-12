export default interface HttpClient { 
  get(url: string, params: any): Promise<any>
  post(url: string, body: any): Promise<any>
}