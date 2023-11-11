import express from "express";
import fs from "fs/promises"


const PORT = '8080';
const app = express();

app.get('/', (req , res)=>{
res.status(200).send('Hello, World!')
})


app.post('/', (req,res) =>{
    res.status(200).send('Creat a product')
})


app.get('/products', async(req , res)=>{
    const products = JSON.parse(await fs.readFile('product.json' , 'utf-8'));
    res.status(200).send({
        sucsess: true,
        payload: products,
    })
    
    return;
    })
    
app.post('/products', (req,res) =>{
    const newProduct= {
        id: new Date().getTime().toString,
        title: req.body.title ,
        price: req.body.price ,
    }
    products.push(newProduct);
    res.status(201).send({
        sucsess: true,
        payload: newProduct, 
    }) 
   
    return;
})


app.listen(PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
})