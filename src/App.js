import { useEffect, useState } from 'react';
import './App.css';
import Users from "./components/Users/Users.jsx"
import {Success} from "./components/Success/Success.jsx"

function App() {
  
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);
  
  function onChangeSearchValue(event) {
    setSearchValue(event.target.value)
  }

  const onClickInvites = (id) => {
    setInvites(prevState => {
      if(prevState.includes(id)) {
        return prevState.filter(invitedId => invitedId !== id);
      } else {
        return [...prevState, id]
      }
    })
  };

  function onClickSendInvites() {
    setSuccess(true);
  }

  useEffect(() => {
      fetch("https://reqres.in/api/users") 
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.log(error))
      .finally( () => setIsLoading(false))
  }, [])
  return (
    <div className="App">
      {success ? <Success count={invites.length}/> : <Users onClickSendInvites={onClickSendInvites} onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} users={users} isLoading={isLoading} onClickInvites={onClickInvites} invites={invites}/>}
    </div>
  );
}

export default App;
