import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import { green, bold } from "https://deno.land/std@0.63.0/fmt/colors.ts";
import productRoutes from "./routes/product.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 1150;
const HOST = env.HOST || '127.0.0.1';

const app = new Application();

app.use(productRoutes.routes());

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname}:${port}`;
    console.log(bold("Listening on: " + green(url)));
});

await app.listen(`${HOST}:${PORT}`);