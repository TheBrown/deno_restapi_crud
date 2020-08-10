import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import productController from "../controllers/product.ts";

const router = new Router({
    prefix: "/product"
});

router
    .get("/", productController.getProducts)
    .get("/price", productController.getProductPrice)
    .get("/:id", productController.getProductById)
    .post("/", productController.addProduct)
    .put("/:id", productController.updateProduct)
    .delete("/:id", productController.deleteProductById);

export default router;