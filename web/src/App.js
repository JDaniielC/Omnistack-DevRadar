import React, {useState, useEffect} from 'react';
import api from './services/api';
import './styles/Global.css';
import './styles/App.css';
import './styles/Main.css';
import './styles/SideBar.css';
import './styles/responsive.css';
import DevItem from './components/Devitem';
import DevForm from './components/DevForm';

function App() {
  const [showClass, setShowClass] = useState("none");
  const [asideClass, setAsideClass] = useState("");
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    const inPage = devs.filter((user) => (
      response.data.github_username === user.github_username
    ))
    if (inPage.length === 0) {
      setDevs([...devs, response.data]);
    }
  }

  function hideAside() {
    if (asideClass === "") {
      setAsideClass("hide")
      setShowClass("block")
    } else {
      setAsideClass("")
      setShowClass("none")
    }
  }

  return (
    <div id="app">
      <button className="showbtn" onClick = {hideAside}
        style = {{ display: showClass }}>
        &gt;
      </button>
      <aside className = {asideClass}>
        <button className="hidebtn" onClick = {hideAside}>
          &lt;
        </button>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev=> (
            <DevItem key= {dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
