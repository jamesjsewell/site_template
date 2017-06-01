import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './views/components/appComponent.js';
//import NotFoundPage from './views/components/pages/not-found-page';

// Import static pages
//import HomePage from './views/components/pages/home-page';
//import ContactPage from './views/components/pages/contact-page';
//import ComponentSamplesPage from './views/components/pages/component-samples';

// Import authentication related pages
import Register from './views/components/authComponents/registerComponent.js';
import Login from './views/components/authComponents/loginComponent.js';
import Logout from './views/components/authComponents/logoutComponent.js';
import ForgotPassword from './views/components/authComponents/forgotPasswordComponent.js';
import ResetPassword from './views/components/authComponents/ResetPasswordComponent.js';

// Import dashboard pages
//import Dashboard from './views/components/dashboard/dashboard';
// import ViewProfile from './views/components/dashboard/profile/view-profile';
//  <Route path="profile" component={RequireAuth(ViewProfile)} />
//import Inbox from './views/components/dashboard/messaging/inbox';
//import Conversation from './views/components/dashboard/messaging/conversation';
//import ComposeMessage from './views/components/dashboard/messaging/compose-message';
//import BillingSettings from './views/components/billing/settings';
//<Route path="billing/settings" component={RequireAuth(BillingSettings)} />

// Import billing pages
//import InitialCheckout from './views/components/billing/initial-checkout';
//<Route path="checkout/:plan" component={RequireAuth(InitialCheckout)} />

// Import admin pages
//import AdminDashboard from './views/components/admin/dashboard';
//<Route path="dashboard">
//      <IndexRoute component={RequireAuth(Dashboard)} />
//      <Route path="inbox" component={RequireAuth(Inbox)} />
//      <Route path="conversation/new" component={RequireAuth(ComposeMessage)} />
//      <Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
//    </Route>

// Import higher order components
import RequireAuth from './views/components/authComponents/requireAuthComponent.js';
// //
// <IndexRoute component={HomePage} />
//     <Route path="contact-us" component={ContactPage} />
//     <Route path="component-samples" component={RequireAuth(ComponentSamplesPage)} />
//     <Route path="register" component={Register} />
//     <Route path="login" component={Login} />
//     <Route path="logout" component={Logout} />
//     <Route path="forgot-password" component={ForgotPassword} />
//     <Route path="reset-password/:resetToken" component={ResetPassword} /> 
//     <Route path="admin" component={RequireAuth(AdminDashboard)} />
//     <Route path="*" component={NotFoundPage} />

export default (

    <Route path="/" component={App}>
        <Route path="register" component={Register} />
    </Route>

);



