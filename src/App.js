import React, { Component }        from 'react'
import { Provider }                from 'react-redux'
import { Router, Route, Switch }   from 'react-router-dom'
import history                     from 'utils/history'
import configureStore              from 'core/store'
import { checkIndexAuthorization } from 'core/api'

import MainLayout           from 'views/components/MainLayout'
import Login                from 'views/containers/Login'
import ContactUs            from 'views/components/ContactUs'
import ThankYou             from 'views/components/ThankYou'
import Register             from 'views/containers/Register'
import ForgotPassword       from 'views/containers/ForgotPassword'
import Profile              from 'views/containers/Profile'
import Dashboard            from 'views/containers/Dashboard'
import PaymentHistory       from 'views/containers/PaymentHistory'
import PaymentNew           from 'views/containers/PaymentNew'
import PaymentSuccess       from 'views/containers/PaymentSuccess'
import PayAccounts          from 'views/containers/PayAccounts'
import RecurringPayments    from 'views/containers/RecurringPayments'
import RecurringPaymentEdit from 'views/containers/RecurringPaymentEdit'
import RecurringPaymentNew  from 'views/containers/RecurringPaymentNew'
import Documents            from 'views/containers/Documents'
import MessageCenter        from 'views/containers/MessageCenter'

// import NotFound from 'views/components/NotFound'
import AuthorizedRoute      from 'views/components/RouteHelper/AuthorizedRoute'
// import RouteWithLayout from 'views/components/RouteHelper/RouteWithLayout'
import ReduxToastr          from 'react-redux-toastr'

const store = configureStore();
const isAuthorized = () => checkIndexAuthorization(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={true}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar/>

            <Router history={history} >
              <Switch>
                <AuthorizedRoute exact path="/"
                                 layout={MainLayout}
                                 component={Dashboard}
                                 isAuthorized={isAuthorized}
                                 props={{}} />

               <AuthorizedRoute exact path="/payments/new"
                                layout={MainLayout}
                                component={PaymentNew}
                                isAuthorized={isAuthorized}
                                props={{}} />

              <AuthorizedRoute exact path="/payment_success"
                               layout={MainLayout}
                               component={PaymentSuccess}
                               isAuthorized={isAuthorized}
                               props={{}} />

              <AuthorizedRoute exact path="/pay_accounts"
                               layout={MainLayout}
                               component={PayAccounts}
                               isAuthorized={isAuthorized}
                               props={{}} />

              <AuthorizedRoute exact path="/recurring_payments/new"
                              layout={MainLayout}
                              component={RecurringPaymentNew}
                              isAuthorized={isAuthorized}
                              props={{}} />

              <AuthorizedRoute exact path="/recurring_payments/edit"
                              layout={MainLayout}
                              component={RecurringPaymentEdit}
                              isAuthorized={isAuthorized}
                              props={{}} />

               <AuthorizedRoute exact path="/recurring_payments"
                                layout={MainLayout}
                                component={RecurringPayments}
                                isAuthorized={isAuthorized}
                                props={{}} />

               <AuthorizedRoute exact path="/history"
                                layout={MainLayout}
                                component={PaymentHistory}
                                isAuthorized={isAuthorized}
                                props={{}} />

              <AuthorizedRoute exact path="/documents"
                               layout={MainLayout}
                               component={Documents}
                               isAuthorized={isAuthorized}
                               props={{}} />

                <AuthorizedRoute exact path="/profile"
                                 layout={MainLayout}
                                 component={Profile}
                                 isAuthorized={isAuthorized}
                                 props={{}} />

               <AuthorizedRoute exact path="/message_center"
                                layout={MainLayout}
                                component={MessageCenter}
                                isAuthorized={isAuthorized}
                                props={{}} />
                <Route exact path="/forgot_password" component={ForgotPassword} />
                <Route exact path="/contact_us" component={ContactUs} />
                <Route exact path="/thank_you" component={ThankYou} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Router>
        </div>

      </Provider>
    );
  }
}

export default App
