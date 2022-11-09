import { Contenedor } from "../models/products.model.js";

export const index = async (req, res) => {
    const contenedor = new Contenedor();

    const products = await contenedor.getAll();

    if (products) {
        res.status(200).json({
            products: products,
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const show = async (req, res) => {
    const contenedor = new Contenedor();

    const products = await contenedor.getAll();
    const randomIndex = Math.floor(Math.random() * (products.length - 1 + 1) + 0);

    if (products) {
        res.status(200).json({
            randomProduct: products[randomIndex],
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
