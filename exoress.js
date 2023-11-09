import express from "express";
import fs from "fs/promises"

const PORT = '8080';
const app = express();

app.get('/', (req , res)=>{
res.status(200).send('Hello, World!')
})
res.status(500).send({
    sucsess: true,
    message:'server error'
}) 

app.post('/', (req,res) =>{
    res.status(200).send('Creat a product')
})
res.status(500).send({
    sucsess: true,
    message:'server error'
}) 

app.get('/products', async(req , res)=>{
    const products = JSON.parse(await fs.readFile('products.json' , 'utf-8'));
    res.status(200).send({
        sucsess: true,
        payload: products,
    })
    
    res.status(500).send({
        sucsess: true,
        message:'server error'
    })
    return;
    })
    
app.post('/products', (req,res) =>{
    const newProduct= {
        id: new Date().getTime().toString,
        title: req.body.title,
        price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).send({
        sucsess: true,
        payload: newProduct, 
    }) 
    res.status(500).send({
        sucsess: true,
        message:'server error'
    })
    return;
})


app.listen(port,()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
})