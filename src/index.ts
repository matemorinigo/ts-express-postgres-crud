import 'reflect-metadata'

import 'dotenv/config'

import 'module-alias/register'

import app from "./app";



app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
