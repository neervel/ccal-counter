import {ProductsList} from './components/ProductsList.tsx';
import './App.scss';
import { useState } from 'react';

function App() {
  
  return (
    <div className="App">
      <div className="container">
        <ProductsList />
      </div>
    </div>
  );
}

export default App;
