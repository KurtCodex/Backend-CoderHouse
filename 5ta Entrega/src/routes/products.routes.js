import { Router } from "express";
import multer from "multer";
import path from "path";
import {
    create,
    index,
    show,
    update,
} from "../controllers/products.controller.js";

const router = Router();

// bloque para los files, para como guardar.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get("/productos", index);
router.get("/productos/show/:id", show);
router.post("/productos/create", upload.single("thumbnail"), create);
router.put("/productos/update/:id", upload.single("thumbnail"), update);

export default router;