const fs = require("fs")
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Product = require("../models/productModel");

dotenv.config({ path: './config.env' });
const dbInfo = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

const connection = mongoose.connect(dbInfo, dbOptions).then(console.log('import-script connection'));

const products = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8")); 

const importData = async function(){
    try{
      
        
        await Product.create(products); 

    }catch(err){
        console.log(err); 
    }
    process.exit();
}

const deleteData = async function(){
    try{
        await Product.deleteMany(); 
    } catch(err){
        console.log(err);
        
    }
    process.exit();
}
if(process.argv[2] === "--import"){
    importData(); 
}else if (process.argv[2]=== "--delete"){
    deleteData(); 
}