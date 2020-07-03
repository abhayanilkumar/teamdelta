import React from 'react';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import { NavBar } from '../components';
import { CandidateList, CandidateInsert, CandidateUpdate } from '../pages/pages';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/candidate/list" exact component={CandidateList} />
          <Route path="/candidate/create" exact component={CandidateInsert} />
          <Route
              path="/candidate/update/:id"
              exact
              component={CandidateUpdate}
          />
        </Switch>
  </Router>
    );
}

export default App;