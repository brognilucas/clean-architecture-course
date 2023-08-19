export default class Registry { 
  private static instances = new Map();
  
  static register(name: string, instance: any): void {
    this.instances.set(name, instance);
  }
  
  static get(name: string): any {
    return this.instances.get(name);
  }
}
