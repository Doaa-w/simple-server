const http = require("http");
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
  else if(req.url==='/' && req.method === 'POST'){
    res.writeHead(200 , { 'Content-Type': 'text/plain'});
    res.write('post');
    res.end(); 
    console.log('post')
  }
  else if(req.url==='/products' && req.method === 'GET'){
    try {
     res.writeHead(200 , { 'Content-Type': 'application/json'});
     res.write(JSON.stringify(products));
     res.end();
    } catch (error) {
      res.writeHead(200 , { 'Content-Type': 'text/plain'});
      res.write('server error');
      res.end(); 
    }
     } 
     else if(req.url==='/products' && req.method === 'POST'){
      try {
       res.writeHead(200 , { 'Content-Type': 'text/plain'});
       res.write('new product created');
       res.end();
      } catch (error) {
        res.writeHead(200 , { 'Content-Type': 'text/plain'});
        res.write('server error');
        res.end(); 
      }
       } 
       
    
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);