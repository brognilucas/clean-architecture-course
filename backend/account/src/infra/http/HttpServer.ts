export default interface HttpServer {
  listen(port: number): void;
  
  on(method: string, path: string, handler: Function): void;
}