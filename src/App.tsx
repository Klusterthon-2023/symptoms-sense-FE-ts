// src/App.tsx
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Router from './routes';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { selectUser } from './redux/authSlice';

const App: React.FC = () => {
 
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
        <Router />
        <Toaster />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
    </QueryClientProvider>
  );
};

export default App;
