import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CandidatesPage } from "./pages/candidates";
import { CandidatePage } from "./pages/candidate";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/candidate">
          <CandidatePage />
        </Route>
        <Route path="/">
          <CandidatesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
