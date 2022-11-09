import fs from "fs";

const file = "./src/database/products.txt";

export class Contenedor {
    async getAll() {
        try {
            const data = await fs.promises.readFile(file, "utf-8");
            const pkgObject = JSON.parse(data);
            return pkgObject.array;
        } catch (err) {
            console.log("Error en la lectura completa", err);
        }
    }

    async getById(number) {
        try {
            const data = await fs.promises.readFile(file, "utf-8");
            const pkgObject = JSON.parse(data);
            const itemsID = pkgObject.array.find((e) => e.id === number);
            {
                console.log("El producto con el id solicitado es: \n", itemsID);
            }
        } catch (err) {
            console.log("Error en la lectura de id", err);
        }
    }

    async save(obj) {
        try {
            const data = await fs.promises.readFile(file, "utf-8");
            const pkgObject = JSON.parse(data);

            const len = pkgObject.array.length;
            const idAnt = len > 0 ? pkgObject.array[len - 1].id : 0;
            obj.id = idAnt + 1;
            pkgObject.array.push(obj);

            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2));
                console.log("Escritura correcta");
            } catch (err) {
                console.log("Error de escritura", err);
            }
        } catch (err) {
            console.log("Error en la lectura", err);
        }
    }

    async deleteById(number) {
        try {
            const data = await fs.promises.readFile(file, "utf-8");
            const pkgObject = JSON.parse(data);
            console.log(pkgObject.array);
            const findElement = pkgObject.array.find((e) => e.id === number);

            if (findElement) {
                const elementPosition = pkgObject.array.indexOf(findElement); //devuelve la pos
                pkgObject.array.splice(elementPosition, 1); // desde esa pos, elimino 1 en adelante
            } else {
                console.log("Elemento inexistente ");
            }

            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2));
                console.log("Escritura correcta");
            } catch (err) {
                console.log("Error de escritura", err);
            }
        } catch (err) {
            console.log("Error en la lectura de id borrador", err);
        }
    }

    async deleteAll() {
        try {
            const data = await fs.promises.readFile(file, "utf-8");
            const pkgObject = JSON.parse(data);

            pkgObject.array.splice(0, pkgObject.array.length);
            try {
                await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2));
                console.log("Escritura correcta");
            } catch (err) {
                console.log("Error de escritura", err);
            }
        } catch (err) {
            console.log("Error de escritura", err);
        }
    }
}

const executeAll = async () => {
    let contenedorObj = new Contenedor();

    const obj = {
        nameproduct: "Cerveza miller",
        price: "223",
    };

    await contenedorObj.save(obj);
    await contenedorObj.save(obj);
    await contenedorObj.save(obj);
    await contenedorObj.save(obj);
    await contenedorObj.save(obj);

    // setTimeout(async () => { await contenedorObj.getById(1) }, 12000);

    // setTimeout(async () => { await contenedorObj.getAll() }, 14001);

    // setTimeout(async () => { await contenedorObj.deleteById(1) }, 16000);

    // setTimeout(async () => { await contenedorObj.deleteAll() }, 18001);
};

// executeAll();