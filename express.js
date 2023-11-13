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

app.get('/products/:id' ,(req,res)=>{
    const id = req.params.id;
    const product= products.find((product)=> product.id === id);
    if(!product){
        const error = new Error (`product with ${id} not found`)
        error.status =404
        throw error
    }
        res.status(200).send({
            sucsess: true,
            message:' product is here',
            payload: product,
        })  
})

app.post('/', (req,res) =>{
    try {
        res.status(200).send('Creat a product') 
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.delete('/products/:id' , (req , res )=>{
    try {
        const id = req.params.id;
        const product= products.find((product)=> product.id === id);
        if(!product){
            const error = new Error (`product with ${id} not found`)
            error.status =404
            throw error
        }
        const filteredProducts=products.filter((product)=> product.id !==id)
        products = filteredProducts
        res.status(200).send({
            sucsess: true,
            payload: filteredProducts, 
        })
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

app.put('/products/:id', async(req,res) =>{
try {
    const id = req.params.id;
    const {title , price} = req.body;
    const indexProduct = products.find((product)=> product.id === id);
    if(index == -1){
        const error = new Error (`product with ${id} is not found`)
        error.status =404
        throw error
    }
    products[indexProduct].title=title
    products[indexProduct].price=price
    res.status(201).json({
        sucsess: true,
        message: 'product is updated', 
    })  
} catch (error) {
    res.status(500).send({
        sucsess: false,
        message: "server error"
    })
}
})

app.listen(PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
})