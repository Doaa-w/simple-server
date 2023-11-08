const http = require("http");
const { parse } = require("querystring");
const PORT = '8080';

let products = [
  {id: '1' , title: 'laptop' , price: 750}, 
  {id: '2' , title: 'smartphone' , price: 699}, 
  {id: '3' , title: 'tablet' , price: 600}, 
]
http.createServer((req, res) => {

  res.setHeader('Access-Contorol-Allow-Origin', '*');

  if(req.url==='/' && req.method === 'GET'){
    res.writeHead(200 , { 'Content-Type': 'text/plain'});
    res.write('Hello, World!');
    res.end(); 
  }
  else if(req.url==='/products' && req.method === 'GET'){
    try {
     res.writeHead(200 , { 'Content-Type': 'application/json'});
     res.write(JSON.stringify(products));
     res.end();
    } catch (error) {
      res.writeHead(500 , { 'Content-Type': 'text/plain'});
      res.write('server error');
      res.end(); 
    }
     } 
     else if(req.url==='/products' && req.method === 'POST'){
      try {
        let body ='';
        req.on('end',(chunk)=>{
          body=body + chunk;
        });
        req.on('end',()=>{
        const data =parse(body);
        const newProduct={
          id : new Date().getTime().toString,
          title : String(data.title),
          price : Number(data.price),
          
        }
        console.log(newProduct),
        products.push(newProduct);
      
      res.writeHead(201 , { 'Content-Type': 'application/json'});
      res.write(JSON.stringify(products));
      res.end();
    })
      } catch (error) {
        res.writeHead(500 , { 'Content-Type': 'text/plain'});
        res.write('server error');
        res.end(); 
      }
       } 
       
    
  }) 
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);