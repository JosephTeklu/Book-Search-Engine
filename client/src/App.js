import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const client = new ApolloClient({
	uri: "/graphql",
	cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<SearchBooks/>} />
            <Route exact path='/saved' element={<SavedBooks/> }/>
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </Router> 
    </ApolloProvider>

  );
}

export default App;