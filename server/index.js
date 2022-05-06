const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Application",
  port: "3306"
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.post('/api/insert', (req, res) =>{

  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const obs = req.body.obs;
  
  const sqlInsert = "INSERT INTO users (id, name, age, obs) VALUES (?,?,?, ?)"
  db.query(sqlInsert, [id, name, age, obs], (err,result)=>{
    console.log(result);
  })
})

app.get('/api/get/:id', (req,res) => {
  const id = req.params.id;
  const sqlSelect = "Select * From users where id = ? ";
  db.query(sqlSelect, id, (err, result) =>{
    res.send(result[0]);
  });
})

app.get('/api/get', (req,res) => {
  const sqlSelect = "Select * From users";
  db.query(sqlSelect, (err, result) =>{
    res.send(result);
  });
})

app.listen(3001, () =>{
  console.log("Up and Running");
})

app.delete('/api/delete/:id', (req,res) =>{

  const id = req.params.id;
  const sqlDelete = "Delete from users Where id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if(err) {
      console.log(err);
    } 
    else {
    console.log("Deletado com Sucesso");
    }
  });
});


app.put('/api/update', (req,res) =>{

  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const obs = req.body.obs;

  const sqlUpdate = "Update users SET name = ?, age = ?, obs = ? WHERE id = ?";
  db.query(sqlUpdate, [name, age, obs, id], (err, result) =>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  })
})
