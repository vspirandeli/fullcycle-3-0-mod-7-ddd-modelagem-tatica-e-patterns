// Objeto de valor

// Não possui um identificador

export class Address {
  _street: string = '';
  _number: number = 0;
  _city: string = '';
  _zipCode: string = '';
  _state: string = '';

  constructor(street: string, number: number, city: string, zipCode: string, state: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zipCode = zipCode;
    this._state = state;

    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get zipCode() {
    return this._zipCode;
  }

  get state() {
    return this._state;
  }

  validate() {
    if (this._street === '') {
      throw new Error('Street is required');
    }

    if (this._number === 0) {
      throw new Error('Number is required');
    }

    if (this._city === '') {
      throw new Error('City is required');
    }

    if (this._zipCode === '') {
      throw new Error('Zip is required');
    }
  }

  toString() { 
    return `${this._street}, ${this._number} - ${this._city} - ${this._zipCode} - ${this._state}`;
  }
}