import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import {Container} from 'react-bootstrap'
import Home from './Home'
import PeopleList from './PeopleList'



function App() {
  return (
    <div>
      <main className='py-3'>
      <Container>
           <Routes>
    

             <Route path="/" element={<Home/>} exact/>
             <Route path="/api/people/" element={<PeopleList />} />
             {/* <Route path="/cart/:id?" element={<CartScreen />} /> */}


            
          


           </Routes>
      </Container>
      </main>
  </div>
  );
}

export default App;