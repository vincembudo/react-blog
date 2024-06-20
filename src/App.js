import React from 'react'
import MyRouter from './router/MyRouter.js'
import Navbar from './components/navbar.js'
import Footer from './components/footer.js'

function App() {


  return (
    <div>
      <Navbar />
      <MyRouter />
      <Footer />
    </div>
  );
}

export default App;
