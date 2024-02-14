//Import http
const httpCW = require('http');
//Use a constant for the listening port
const cintPort = 3000;

const serverCW = httpCW.createServer((reqCW, resCW) => 
    {
     //array of data chunks
     let arrChunkCW = [];
     //save the method and URL
     const { method, url } = reqCW; 

     // listener for the data
     reqCW.on("data", (chunkCW) => 
       {
        arrChunkCW.push(chunkCW);
       })   

     reqCW.on("end", ()=> 
       { console.log(url, method);
         resCW.statusCode = 200;
         if (method == "GET") 
           {
            //Set the common responses to GET
            resCW.setHeader("content-type", "text/html");
            if (url == "/") 
              {
                resCW.write(`<html><body><h1>Pirates Promise</h1>` + 
                    `<p>If the Pirates win the series, Chuck will give Hunter $1</p>` +
                    `<p>Notarized on: 2/13/2024</p></body></html>`);
              }
           }   
         else if (method == "POST") 
           {
            resCW.setHeader("content-type", "application/json");
            if (url == "/echo")
              { 
                let bodyCW = Buffer.concat(arrChunkCW).toString();
                const responseDataCW = { "method": method, "url": url, "body": bodyCW}
                resCW.write(JSON.stringify(responseDataCW))
              }
              else if (url == "/about") 
              {
                resCW.write(JSON.stringify({name: "Chuck", position: "Catcher", LastYear: 2015}));
              }
            }
        //all things must come to an end
        resCW.end();
       })//END REQUEST
    })//END SERVER 











//remember to put the listener code in first at the bottom 
serverCW.listen(cintPort, () => 
    {console.log(`This server is listening on port ${cintPort}`)});