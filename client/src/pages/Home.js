import React from 'react'
import { useState, useEffect, } from "react";
import '../../src/App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom'

const Home = () => {

    const [idSearch, setIdSearch] = useState('');
    const [DataList, setDataList] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [obs, setObs] = useState('');
    
    useEffect(() =>{
        Axios.get('http://localhost:3001/api/get').then((response)=>{
          console.log(response.data);
          setDataList(response.data);
        })
      }, []);


    const deleteData = (id) =>{
        Axios.delete(`http://localhost:3001/api/delete/${id}`);
        alert("Registro deletado com sucesso");
        setDataList(DataList.filter(user => user.id !== id))
    }
    
    const showOnlySearch = (id) => {
        Axios.get(`http://localhost:3001/api/get/${id}`)
        .then((response)=>{
            console.log(response.data.name);
            setId(response.data.id)
            setName(response.data.name)
            setAge(response.data.age)
            setObs(response.data.obs)
            
        })
    }

    const SubmitForm = (ev) => {
        ev.preventDefault();
    }
    
  return(  
        <div className="Home">
            <h1 style={{textAlign: 'center', marginBottom: '25px'}}>Registros da Aplicação</h1>
            <form onSubmit={SubmitForm}>
                <div class="form-inline">
                    <div className="form-group mb-2">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Digite o Id a Pesquisar :" style={{cursor : 'auto'}} />
                    </div>


                    <div class="form-group mx-sm-3 mb-2">
                        <input 
                        type="number" 
                        className="form-control"
                        style={{width: '100%', }}
                        onChange={(e)=>{setIdSearch(e.target.value)}}
                        placeholder="Digite o ID a Pesquisar"
                        />
                    </div>
                    <button className="btn btn-info mb-2"type="submit" onClick={() => {showOnlySearch(idSearch)}}>Pesquisar</button>
                </div>
            </form>
            {id ? (
            <>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Observações</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{obs}</td>
                            <th><Link className="btn btn-link" to={`/Form/${id}`}> Editar </Link></th>
                            <th><button type="button" style={{color: "red"}}className="btn btn-link" onClick={() => {deleteData(id)}}>Deletar</button></th>
                        </tr>
                    </tbody>
                </table>    
            </>
            ) : 
            <>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Observações</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DataList.map((val, i)=>{
                            return(
                                <tr key={i}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.age}</td>
                                    <td>{val.obs}</td>
                                    <th><Link className="btn btn-link" to={`/Form/${val.id}`}> Editar </Link></th>
                                    <th><button type="button" style={{color: "red"}}className="btn btn-link" onClick={() => {deleteData(val.id)}}>Deletar</button></th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>    
            
            </>
            }

                
            <nav>
                <Link style={{textAlign: 'center'}} to="/Form">Inserir Novo Registro</Link>
            </nav>
        </div>




  )
}

export default Home