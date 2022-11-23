import { Router } from "express";
import multer from "multer";
import path from "path";
import {
    create,
    destroy,
    index,
    renderAbout,
    renderIndex,
    show,
    update
} from "../controllers/products.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// API NO REST
router.get("/", renderIndex);
router.get("/about", renderAbout);

// API REST
router.get("/productos", index);
router.get("/productos/show/:id", show);
router.post("/productos/create", upload.single("thumbnail"), create);
router.put("/productos/update/:id", upload.single("thumbnail"), update);
router.delete("/productos/delete/:id", destroy);

// NOT FOUND
router.get("*", (req, res) => {
    res.render("404");
});


export default router;
