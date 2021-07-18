import express from "express";


const app = express();
app.use(express.json());

app.get('/', (request, response)=>{
  return response.json({MSG:"Hello"});
})

app.listen(3333, () => {
  console.log('💥️🐍️💻️Server Started on port 3333💥️🐍️💻️');
});

