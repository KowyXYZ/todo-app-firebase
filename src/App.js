import { useState } from 'react';
import {BrowserRouter} from 'react-router-dom'

import Cookies from 'universal-cookie';
import Authentication from './components/Authentication';
import ToDo from './components/ToDo';
const cookies = new Cookies()


function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))


  if(!isAuth){
    return(
      <BrowserRouter BrowserRouter>
      <div className='w-full'>
        <Authentication setIsAuth={setIsAuth}/>
      </div>
    </BrowserRouter>
    )
  }

  return (
    <div>
      <ToDo setIsAuth={setIsAuth}/>
    </div>
  );
}

export default App;
