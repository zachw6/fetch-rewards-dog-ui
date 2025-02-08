import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';
import { FetchProvider } from './contexts/FetchProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Search from './screens/Search';

export const axiosFetchClient = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true
})

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchProvider>
        <Router basename='fetch-rewards-dog-ui'>
          <Routes>
            <Route path="/" Component={Search} />
          </Routes>
        </Router>
      </FetchProvider>
    </QueryClientProvider>
  )
}

export default App
