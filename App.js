import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { FoodProvider } from './components/FoodContext';


function App() {
  return (
    <FoodProvider>
      <MainContainer/>
    </FoodProvider>
  );
}

export default App;
