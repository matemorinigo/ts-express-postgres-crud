import 'dotenv/config'

import 'module-alias/register'


import app from "./app";
import * as process from "node:process";


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
