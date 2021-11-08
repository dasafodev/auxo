import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CandidatesPage } from "./pages/candidates";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <CandidatesPage />
        </Route>
        <Route path="/candidate">
          <CandidatesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
