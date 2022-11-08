const fs = require('fs');

const file = './productos.txt';

class Contenedor {
    //metodos
    async save(obj) { //pushea un nuevo obj
        try {
            const data = await fs.promises.readFile(file, 'utf-8')
            const pkgObject = JSON.parse(data)

            const len = pkgObject.array.length
            const idAnt = len > 0 ? pkgObject.array[len - 1].id : 0
            obj.id = idAnt + 1
            pkgObject.array.push(obj)

            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2))
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
            const data = await fs.promises.readFile(file, 'utf-8')
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
            const data = await fs.promises.readFile(file, 'utf-8')
            const pkgObject = JSON.parse(data)
            console.log("Lista de productos: \n", pkgObject.array)
        }
        catch (err) { console.log("Error en la lectura completa", err) }
    }



    async deleteById(number) { //elimina con el id buscado
        try {
            const data = await fs.promises.readFile(file, 'utf-8')
            const pkgObject = JSON.parse(data)
            console.log(pkgObject.array)
            const findElement = pkgObject.array.find((e) => e.id === number)

            if (findElement) {
                const elementPosition = pkgObject.array.indexOf(findElement); //devuelve la pos
                pkgObject.array.splice(elementPosition, 1); // desde esa pos, elimino 1 en adelante
            }
            else { console.log("Elemento inexistente ") }

            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2))
                console.log("Escritura correcta")
            }
            catch (err) {
                console.log("Error de escritura", err)
            }
        }
        catch (err) { console.log("Error en la lectura de id borrador", err) }
    }


    async deleteAll() { //borra tdo
        try {
            const data = await fs.promises.readFile(file, 'utf-8')
            const pkgObject = JSON.parse(data)

            pkgObject.array.splice(0, pkgObject.array.length)
            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2))
                console.log("Escritura correcta")
            }
            catch (err) {
                console.log("Error de escritura", err)
            }
        }
        catch (err) {
            console.log("Error de escritura", err)
        }
    }
}

const executeAll = async () => {
    let contenedorObj = new Contenedor();

    const obj = {

        "nameproduct": "Cerveza miller",
        "price": "223"
    }

    setTimeout(async () => { await contenedorObj.save(obj) }, 2000);
    setTimeout(async () => { await contenedorObj.save(obj) }, 4000);
    setTimeout(async () => { await contenedorObj.save(obj) }, 6001);
    setTimeout(async () => { await contenedorObj.save(obj) }, 8000);
    setTimeout(async () => { await contenedorObj.save(obj) }, 10000);

    setTimeout(async () => { await contenedorObj.getById(1) }, 12000);

    setTimeout(async () => { await contenedorObj.getAll() }, 14001);

    setTimeout(async () => { await contenedorObj.deleteById(1) }, 16000);

    setTimeout(async () => { await contenedorObj.deleteAll() }, 18001);
}

executeAll();
