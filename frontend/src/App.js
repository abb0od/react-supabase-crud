import Auth from "./components/Auth";
import Todos from "./components/Todos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
