import React from 'react'
import { registerRootComponent } from 'expo'
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ProductList from './ProductListPage'

const App = () => {
  return (
    <Provider store={store}>
      <ProductList/>
    </Provider>
    
  )
};
export default App;
registerRootComponent(App);