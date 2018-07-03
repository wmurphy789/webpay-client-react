import React                from 'react';
import { Route, Redirect }  from 'react-router-dom'

const AuthorizedRoute = ({ props, component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={(routeProps) => (
     rest.isAuthorized() ? (
      <Layout {...routeProps} {...props} >
        <Component {...routeProps} {...props} />
      </Layout>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: routeProps.location }
      }}/>
    )
  )} />
)


export default AuthorizedRoute;
