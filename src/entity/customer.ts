import { Address } from "./address";

class Customer {
  _id: string;
  _name: string;  
  _address!: Address;
  _active: boolean = true;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate() {
    if (!this._name) {
      throw new Error("Name is required");
    }

    if (this._name.length < 3) {
      throw new Error("Name must have at least 3 characters");
    }

    if (!this._address) {
      throw new Error("Address is required");
    }

    if (!this._id) {
      throw new Error("Id is required");
    }
  }

  // Trás uma regra de negócio para a entidade. Mais semântica.
  changeName(name: string) {
    this._name = name;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  setAddress(address: Address) {
    this._address = address;
  }
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// Nesse ponto do código é mostrado a inconsistência dos dados. Pois não existe cliente sem nome. 
// A entdade deve estar consistente 100% do tempo.
// class Customer {
//   _id: string;
//   _name: string = "";  
//   _address: string = "";
//   _active: boolean = true;

//   constructor(id: string) {
//     this._id = id;
//   }

//   // Trás uma regra de negócio para a entidade. Mais semântica.
//   changeName(name: string) {
//     this._name = name;
//   }

//   activate() {
//     this._active = true;
//   }

//   deactivate() {
//     this._active = false;
//   }
// }

// let cliente = new Customer("1");
// cliente.changeName("João");

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Exemplo de entidade anêmica. A entidade não possui comportamento, apenas atributos.
// A entidade é responsável por armazenar os dados de um cliente. Sem regras de negócio.
// class Customer {
//   _id: string;
//   _name: string;  
//   _address: string;

//   constructor(id: string, name: string, address: string) {
//     this._id = id;
//     this._name = name;
//     this._address = address;
//   }

//   get id(): string {
//     return this._id;
//   }

//   get name(): string {
//     return this._name;
//   }

//   get address(): string {
//     return this._address;
//   }

//   set name(name: string) {
//     this._name = name;
//   }

//   set address(address: string) {
//     this._address = address;
//   }
// }