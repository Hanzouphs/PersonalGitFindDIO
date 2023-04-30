import {Header} from '../../Components/Header';
import {useState} from 'react'
import ItemList  from '../../Components/ItemList';


import './style.css'

function App() {
  const [user, setUser] =useState('');
  const [Currentuser, setCurrentUser] =useState(null);
  const [repos, setRepos] =useState(null);

const handleGetData = async () => {
  const userData = await fetch(`https://api.github.com/users/${user}`);
  const newUser = await userData.json();

  if(newUser.name) {
    const {avatar_url, name, bio, login} = newUser;
    setCurrentUser({avatar_url, name, bio, login})

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();

    if(newRepos.length) {
      setRepos(newRepos)
    }

  }
}

  return (
    <div className="App">
      <Header/>
        <div className="conteudo">
        <div className="info">
          <div>
            <input name="usuario" value={user}
             onChange={event => setUser(event.target.value)}
              placeholder="@username"/>
            <button onClick={handleGetData}>Buscas</button>
          </div>
          {Currentuser?.name? (<>
            <div className="profile">
            <img src={Currentuser.avatar_url} alt="Usuário"/>
            <div>
              <h3>{Currentuser.name}</h3>
              <span>@{Currentuser.login}</span>
              <p>{Currentuser.bio}</p>
            </div>
          </div>
          <hr/>
          </>): null}
          <div>
          {repos?.length? (<>
            <h4 className="repositorio">Repositórios</h4>
            {repos.map((repo) => (
            <ItemList title={repo.name} description={repo.description}/>
            ))}
          </>): null}
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
