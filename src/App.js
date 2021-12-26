import React, { useState,useEffect } from 'react';
import { Switch,Route,Link,useParams } from 'react-router-dom'

const Dino = () => {
  const [Dino, setUser] = useState([])
  const usuarios = []
  let params = useParams();
  const getUser = () => {
    fetch('http://localhost:8080/api/'+params.ID)
      .then(response => response.json())
      .then(user => {usuarios.push(user);setUser(usuarios);})
      .catch(err => console.log(err.message))
      console.log(usuarios)
      
  }
  

  useEffect(() => { getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [])
      return (  
      <section>
          {Dino.map((u) =>
          <div key={u.ID}>
          <h1>{ params.ID } Dinosaurio- {u.Dino}</h1>
          <p>Altura: {u.Altitud}</p> 
          <p>Longitud: {u.Longitud}</p> 
          <p><Link to="/">Regresar a la home</Link></p>
          </div>
          
          
        )} 
      </section> 
    
  )
}


const Dinosaurios = () => {
    const [users, setUsers] = useState( [])
  
    function getUsers() {
      fetch('http://localhost:8080/api')
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(err => console.log("eror no indentificado"))
    }
  
    useEffect(() => {
      getUsers()
    }, [])
  
    

    return (  
        <ul>
          {users.map(user => <li key={user.ID}><Link to={"/Dinosaurio/"+user.ID}>{user.Dino}</Link><Link to={"/Dinosaurio/"+user.ID}><img src={user.Imagen} alt='Dinopedia'></img></Link></li>)}        
        </ul>
      
    )
  }

  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1 className="App-title">Dinos</h1>
          </header>
          <Switch>
            <Route exact path="/"><Dinosaurios/></Route>
            <Route exact path="/Dinosaurio/:ID"><Dino/></Route>
          </Switch>        
        </div>
      );
export default App;
