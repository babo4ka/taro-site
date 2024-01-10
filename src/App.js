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
import MyGeneralPreds from './components/my_preds/MyGeneralPreds';
import GetYNPred from './components/get_preds/GetYNPred';
import MyYNPreds from './components/my_preds/MyYNPreds';
import GetPPFPred from './components/get_preds/GetPPFPred';
import MyPPFPreds from './components/my_preds/MyPPFPreds';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage/>}/>
          <Route exact path="/getGeneral" element={<GetGeneralPred/>} />
          <Route exact path="/myGeneral" element={<MyGeneralPreds/>}/>
          <Route exact path="/getYN" element={<GetYNPred/>}/>
          <Route exact path="/myYN" element={<MyYNPreds/>}/>
          <Route exact path="/getPPF" element={<GetPPFPred/>}/>
          <Route exact path="/myPPF" element={<MyPPFPreds/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
