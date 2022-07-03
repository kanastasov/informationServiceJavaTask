import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import {Container} from 'react-bootstrap'
import Home from './Home'
import PeopleList from './PeopleList'
import PeopleEdit from './PeopleEdit'



function App() {
  return (
    <div>
      <main className='py-3'>
      <Container>
           <Routes>
    

             <Route path="/" element={<Home/>} exact/>
             <Route path="/api/people/" element={<PeopleList />} />
             <Route path="/api/people/new" element={<PeopleEdit />} />
             <Route path="/api/people/new/:id" element={<PeopleEdit />} />
             {/* <Route path="/api/people/:id" element={<PeopleEdit />} /> */}



            
          


           </Routes>
      </Container>
      </main>
  </div>
  );
}

export default App;