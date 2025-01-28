import { v4 as uuidv4 } from 'uuid';

class Salad {
    static #instanceCounter = 0;
    
    constructor(salad) {
        if (salad instanceof Salad) {
            // Copy constructor
            this.ingredients = { ...salad.ingredients };
            this.uuid = salad.uuid;
        } else if (typeof salad === 'object' && salad !== null) {
            // Create from plain object, possibly from JSON parse
            this.ingredients = { ...salad.ingredients };
            this.uuid = salad.uuid || uuidv4(); 
        } else {
            
            this.ingredients = {};
            this.uuid = uuidv4(); 
        }
    }



    add(name, properties) {
        this.ingredients[name] = properties;
        return this; 
    }
    remove(name) {
        delete this.ingredients[name];
        return this; 
    }

    static parse(json) {
        const obj = JSON.parse(json);
        if (Array.isArray(obj)) {
          return obj.map(salad => new Salad(salad));
        } else {
          return new Salad(obj);
        }
      }

}export default Salad;


/**
* Reflection question 1
* Map är inte ett enkelt objekt, så JavaScript kan inte 
* omvandla det till en JSON-sträng på samma sätt som vanliga objekt.
* Serialization is the conversion of an object or a data structure to 
* another format that is easily transferrable on the network.

*/