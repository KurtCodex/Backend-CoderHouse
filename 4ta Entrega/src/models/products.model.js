import fs from "fs";

const file = "./src/database/products.txt";

export class Contenedor {
    async getAll() {
        return new Promise((resolve, reject) => {
            fs.promises
                .readFile(file, "utf-8")
                .then((data) => {
                    const parseData = JSON.parse(data);
                    resolve(parseData.products);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    async getByID(id) {
        return new Promise((resolve, reject) => {
            fs.promises
                .readFile(file, "utf-8")
                .then((data) => {
                    const parseData = JSON.parse(data);
                    const product = parseData.products.find((e) => {
                        return e.id == id;
                    });
                    resolve(product);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    async save(formData) {
        return new Promise((resolve, reject) => {
            fs.promises
                .readFile(file, "utf-8")
                .then((data) => {
                    const parseData = JSON.parse(data);
                    const newProduct = {
                        id: parseData.products.length + 1,
                        ...formData,
                    };
                    parseData.products.push(newProduct);
                    fs.promises
                        .writeFile(file, JSON.stringify(parseData, null, 2))
                        .then(() => {
                            resolve(newProduct.id);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    async update(formData, id) {
        return new Promise((resolve, reject) => {
            fs.promises
                .readFile(file, "utf-8")
                .then((data) => {
                    const parseData = JSON.parse(data);
                    let product = parseData.products.find((e) => e.id == id);

                    if (product) {
                        product = {
                            ...product,
                            ...formData,
                        };

                        parseData.products = parseData.products.map((e) => {
                            if (e.id == id) {
                                return product;
                            } else {
                                return e;
                            }
                        });

                        fs.promises
                            .writeFile(file, JSON.stringify(parseData, null, 2))
                            .then(() => {
                                resolve(product.id);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    // async deleteById(number) {
    //   try {
    //     const data = await fs.promises.readFile(file, "utf-8");
    //     const pkgObject = JSON.parse(data);
    //     console.log(pkgObject.array);
    //     const findElement = pkgObject.array.find((e) => e.id === number);

    //     if (findElement) {
    //       const elementPosition = pkgObject.array.indexOf(findElement); //devuelve la pos
    //       pkgObject.array.splice(elementPosition, 1); // desde esa pos, elimino 1 en adelante
    //     } else {
    //       console.log("Elemento inexistente ");
    //     }

    //     try {
    //       await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2));
    //       console.log("Escritura correcta");
    //     } catch (err) {
    //       console.log("Error de escritura", err);
    //     }
    //   } catch (err) {
    //     console.log("Error en la lectura de id borrador", err);
    //   }
    // }

    // async deleteAll() {
    //   try {
    //     const data = await fs.promises.readFile(file, "utf-8");
    //     const pkgObject = JSON.parse(data);

    //     pkgObject.array.splice(0, pkgObject.array.length);
    //     try {
    //       await fs.promises.writeFile(file, JSON.stringify(pkgObject, null, 2));
    //       console.log("Escritura correcta");
    //     } catch (err) {
    //       console.log("Error de escritura", err);
    //     }
    //   } catch (err) {
    //     console.log("Error de escritura", err);
    //   }
    // }
}