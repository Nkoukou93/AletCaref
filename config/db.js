import dotenv from 'dotenv';
import {connect,set } from 'mongoose';

dotenv.config();

export const dbconfig={
    url:process.env.MONGO_URI,
    async dbConect(){
        try{
            
        set('strictQuery',false);
        await connect(this.url);
        console.log("Database Connected Successfully");
        
    }
    catch(err){
        console.log(err.message);
        process.exit()
    }

    }
    }

    
