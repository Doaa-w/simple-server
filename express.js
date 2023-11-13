import express from "express";
import fs from "fs/promises"

let products = [
 
{id: '1' , title: 'laptop' , price: 750}, 
{id: '2' , title: 'smartphone' , price: 699}, 
{id: '3' , title: 'tablet' , price: 600}, 

]

const PORT = '8080';
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req , res)=>{
    try {
      res.status(200).send('Hello, World!')  
    } catch (error) {
        res.status(500).send('server error')
    }

})


app.post('/', (req,res) =>{
    try {
        res.status(200).send('Creat a product') 
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.get('/products', async(req , res)=>{
    const Products = JSON.parse(await fs.readFile('product.json' , 'utf-8'));
    res.status(200).send({
        sucsess: true,
        payload: products,
    })
    
    return;
    })

app.post('/products', async(req,res) =>{
    if(!req.body.title){
        return res.status(404).json({message: 'title is missing'})
    }
    if(!req.body.price){
        return res.status(404).json({message: 'price is missing'})
    }
    const Products = JSON.parse(await fs.readFile('product.json' , 'utf-8'));
    try {
        const {title , price} = req.body;
     const newProduct= {
        id: new Date().getTime().toString,
        title: title ,
        price: price ,
    }
    products.push(newProduct);
    res.status(201).send({
        sucsess: true,
        payload: newProduct, 
    })    
    } catch (error) {
        res.status(500).send({
            sucsess: false,
            message: "server error"
        })
    }
    
    return;
})


app.listen(PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
})