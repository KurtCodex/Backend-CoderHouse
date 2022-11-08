const fs = require('fs');

class Contenedor {
    //metodos
    async save(obj) { //pushea un nuevo obj
        try {
            const data = await fs.promises.readFile('./package.json', 'utf-8')
            const pkgObject = JSON.parse(data)

            const len = pkgObject.array.length
            const idAnt = pkgObject.array[len - 1].id
            obj.id = idAnt + 1
            pkgObject.array.push(obj)


            await fs.promises.writeFile('./package.json', JSON.stringify(pkgObject, null, 2))
            try {
                console.log("Escritura correcta")
            }
            catch (err) {
                console.log("Error de escritura", err)
            }
        }
        catch (err) { console.log("Error en la lectura", err) }
    }


    async getById(number) { // retorna el objeto con el id 
        try {
            const data = await fs.promises.readFile('./package.json', 'utf-8')
            const pkgObject = JSON.parse(data)
            const itemsID = pkgObject.array.find((e) => e.id === number)
            {
                console.log("El producto con el id solicitado es: \n", itemsID)
            }
        }
        catch (err) { console.log("Error en la lectura de id", err) }
    }



    async getAll() { //retorna los objetos del array
        try {
            const data = await fs.promises.readFile('./package.json', 'utf-8')
            const pkgObject = JSON.parse(data)
            console.log("Lista de productos: \n", pkgObject.array)
        }
        catch (err) { console.log("Error en la lectura completa", err) }
    }



    async deleteById(number) { //elimina con el id buscado
        try {
            const data = await fs.promises.readFile('./package.json', 'utf-8')
            const pkgObject = JSON.parse(data)
            console.log(pkgObject.array)
            const itemsRemoved = pkgObject.array.splice(number, 1)
            console.log("El item removido es: \n", itemsRemoved);
            // console.log("La lista de items con el item removido es: \n", pkgObject)

            fs.promises.writeFile('./package.json', JSON.stringify(pkgObject, null, 2))
            try {
                console.log("Escritura correcta")
            }
            catch (err) {
                console.log("Error de escritura", err)
            }
        }
        catch (err) { console.log("Error en la lectura de id borrador", err) }
    }
    deleteAll() { //borra tdo

    }

}

let contenedorObj = new Contenedor();

const obj = {
    "id": 0,
    "nameproduct": "Cerveza corona",
    "price": "223"
}

contenedorObj.save(obj);
contenedorObj.getById(1);
contenedorObj.getAll();
contenedorObj.deleteById(1);
