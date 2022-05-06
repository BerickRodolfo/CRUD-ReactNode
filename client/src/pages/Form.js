import React, { useEffect } from 'react'
import Axios from 'axios' 
import { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {

    const { id } = useParams();
    const [idInsert, setIdInsert] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [obs, setObs] = useState("");
    const [DataList, setDataList] = useState([]);
    let navigate = useNavigate();

    useEffect(() =>{
        if(id){
            Axios.get(`http://localhost:3001/api/get/${id}`)
            .then((response)=>{
            setName(response.data.name);
            setAge(response.data.age);
            setObs(response.data.obs);
            console.log(response.data);
            })
        }
    }, []);

    const submitData = () => {
        Axios.post("http://localhost:3001/api/insert", {
          id: idInsert, 
          name: name, 
          age: age,
          obs : obs
        });
        setDataList([
          ...DataList, 
          {
          id: idInsert, 
          name: name, 
          age : age,
          obs : obs
          }
        ])
        alert("Inserido com Sucesso")
        navigate('/')
      }
    
  const updateData = (id) =>{
    Axios.put("http://localhost:3001/api/update", {
      id: id, 
      name : name,  
      age: age,
      obs : obs
    })
    .then((response) => {
      alert('Alterado com Sucesso');
      navigate("/")
    });
  }      

  return (
    <div className="Form">  
        <h1 style={{fontFamily: 'Helvetica'}}>Modifique ou Insira seu Registro</h1>
        <form>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Digite a Matrícula:</label>
            <div className="col-sm-10">
            <input
                style={{maxWidth : '95%'}}
                className="form-control"
                type="number"
                name="id"
                placeholder="Digite a Matrícula"
                onChange={(e)=>{setIdInsert(e.target.value)}}
                value={id}
                disabled={!!id}
            />
            </div>
        </div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Digite o Nome: </label>
            <div className="col-sm-10">
                <input 
                style={{maxWidth : '95%'}}
                className="form-control"
                type="text" 
                name="name" 
                placeholder="Digite seu nome" 
                onChange={(e)=>{setName(e.target.value)}} 
                value={name}
                />
            </div>
        </div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Digite a Idade: </label>
            <div className="col-sm-10">
                <input 
                style={{maxWidth : '95%'}}
                className="form-control"
                type="number" 
                name="age" 
                placeholder="Digite sua idade" 
                onChange={(e)=>{setAge(e.target.value)}}  
                value={age}
                />
            </div>
        </div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Observações:</label>
            <div className="col-sm-10">
                <input 
                style={{maxWidth : '95%'}}
                className="form-control"
                type="text" 
                name="obs" 
                placeholder="Observações" 
                onChange={(e)=>{setObs(e.target.value)}}  
                value={obs}
                />
            </div>
        </div>
            <button type="button" className="btn btn-success" onClick={() => id ? updateData(id) : submitData()}> Enviar dados</button>       
        </form>
    </div>
  )
}

export default Form