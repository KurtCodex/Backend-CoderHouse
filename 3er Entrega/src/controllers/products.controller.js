import { Contenedor } from "../models/products.model.js";

export const index = async (req, res) => {
    const contenedor = new Contenedor();

    contenedor
        .getAll()
        .then((data) => {
            res.status(200).json({
                products: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                error: err,
            });
        });
};

export const show = async (req, res) => {
    // req.query "?id=1"
    // req.params "/:id"
    const { id } = req.params;

    if (id) {
        const contenedor = new Contenedor();

        contenedor
            .getByID(id)
            .then((data) => {
                res.status(200).json({
                    product: data,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err,
                });
            });
    } else {
        res.status(400).json({
            message: "Bad Request, missing id",
        });
    }
};

export const create = async (req, res) => {
    const { name, price } = req.body;
    const { path } = req.file;

    const contenedor = new Contenedor();

    contenedor
        .save({
            name: name,
            price: parseFloat(price),
            thumbnail: path,
        })
        .then((id) => {
            res.status(200).json({
                message: "Product created",
                id,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Internal Server Error",
                error: err,
            });
        });
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const { path } = req.file;

    if (id) {
        const contenedor = new Contenedor();

        contenedor
            .update(
                {
                    name: name,
                    price: parseFloat(price),
                    thumbnail: path,
                },
                id
            )
            .then((id) => {
                res.status(200).json({
                    message: "Product updated",
                    id,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Internal Server Error",
                    error: err,
                });
            });
    } else {
        res.status(400).json({
            message: "Bad Request, missing id",
        });
    }
};

