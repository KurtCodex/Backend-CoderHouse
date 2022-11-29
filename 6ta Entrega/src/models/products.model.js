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
                        fs.rmSync(`./${product.thumbnail}`, {
                            force: true,
                        });

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

    async deleteByID(id) {
        return new Promise((resolve, reject) => {
            fs.promises
                .readFile(file, "utf-8")
                .then((data) => {
                    const parseData = JSON.parse(data);
                    let product = parseData.products.find((e) => e.id == id);

                    if (product) {
                        fs.rmSync(`./${product.thumbnail}`, {
                            force: true,
                        });

                        parseData.products = parseData.products.filter((e) => e.id != id);

                        fs.promises
                            .writeFile(file, JSON.stringify(parseData, null, 2))
                            .then(() => {
                                resolve(product.id);
                            })
                            .catch((err) => {
                                reject(err);
                            });

                        resolve("Product deleted");
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}