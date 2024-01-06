import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store/store'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainPage from './components/MainPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
