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
import GetGeneralPred from './components/get_preds/GetGeneralPred';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/getGeneral" element={<GetGeneralPred/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
