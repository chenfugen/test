import React from 'react';
import './App.css';
// @ts-ignore
import routes from './routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
  // @ts-ignore
    return (
   <Router>
     <Switch>
       {routes.map((route, i) => (
         <RouteWithSubRoutes key={i} {...route} />
       ))}
       <Route path='*'>
         <div>not found</div>
       </Route>
     </Switch>
   </Router>
  );
}

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props:any) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export default App;
