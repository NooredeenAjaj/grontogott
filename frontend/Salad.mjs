import { v4 as uuidv4 } from 'uuid';

class Salad {
    static #instanceCounter = 0;
    
    constructor(salad) {
        
        if ( typeof salad === 'object') {
            
            this.ingredients = { ...salad.ingredients };
        } else {
            // No valid salad object passed, create an empty salad
            this.ingredients = {};
        }
        this.id = 'salad_' + Salad.#instanceCounter++;
        this.uuid = uuidv4()
        // const id = 'salad_' + Salad.#instanceCounter++;

        // Object.defineProperty(this, 'id', {
        //     value: id,
        //     writable: false, // Gör det skrivskyddat
        //     configurable: false,
        //     enumerable: true
        // });

        //jag måste lägg till value:this.id . vad är det att id är lokal 


        //vad är skillanden mellan typeof Salad: function
        //typeof Salad.prototype: object
        // vad händer med Object.defineProperty läs den på föreläsning 
        
    
    }



    add(name, properties) {
        this.ingredients[name] = properties;
        return this; // Return the object for chaining
    }
    remove(name) {
        delete this.ingredients[name];
        return this; // Return the object for chaining
    }

static parse(json) {
        const data = JSON.parse(json);
        if (Array.isArray(data)) {
            return data.map(item  => {
                s = new Salad(item);
                s.uuid=item.uuid;
               
                return s;


            }); 
        } else {
            r = new Salad(data);
            r.uuid= data.uuid;
            return r; // Convert single object
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