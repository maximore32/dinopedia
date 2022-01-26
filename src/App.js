import React, { useState,useEffect } from 'react';
import { Switch,Route,Link,useParams } from 'react-router-dom'


var titulin= "App informativa sobre dinosaurios"

const Dino = () => {
  const [Dino, setUser] = useState([])
  const usuarios = []
  let params = useParams();
  const getUser = () => {
    fetch("https://diboos.herokuapp.com/api/id/"+params.ID)
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
          <h1 className='h1'>Dinosaurio- {u.Dino}</h1>
          <img className='imagen' src={u.Imagen}></img>
          <p className='parrafin'>Periodo: {u.Periodo}</p> 
          <p className='parrafin'>Altura: {u.Altitud}</p> 
          <p className='parrafin'>Longitud: {u.Longitud}</p>
          <p className='x'>{u.Descripcion}</p>          
          <p><Link to="/">Regresar a la home</Link></p>
          </div>
          
          
        )} 
      </section> 
    
  )
}


const Dinosaurios = () => {
    const [users, setUsers] = useState( [])
  
    function getUsers() {
      fetch('https://diboos.herokuapp.com/api')
        .then(response => response.json())
        .then(users => setUsers(users))
        .catch(err => console.log("error no indentificado"))
    }
  
    useEffect(() => {
      getUsers()
    }, [])
  
    

    return (
        <main className='cuerpo'>
          <div className='h2'><h2>{titulin}</h2></div>
          {users.map(user => 
          <div className='dinocajas' key={user.ID}>
          <Link to={"/Dinosaurio/"+user.ID}><img  className="dinoimg" src={user.Imagen} alt='Dinopedia'></img></Link>
          <h1 className='h1'>{user.Dino}</h1>          
          </div>)}        
        </main>
      
    )
  }

  const App = () => (
        <div className="App">
          <header className="App-header">          
            <h1 className="App-title"><Link to="/">Dinopedia</Link></h1>
          </header>
          <Switch>
            <Route exact path="/"><Dinosaurios/></Route>
            <Route exact path="/Dinosaurio/:ID"><Dino/></Route>
          </Switch>
          <footer><small>Dinopedia 2021</small></footer>        
        </div>
      );
export default App;
