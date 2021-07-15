import React from 'react';

const BusinessDashboard = React.lazy(() => import('./views/dashboard/BusinessDashboard'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: BusinessDashboard, exact: true },
  { path: '/dashboard/business-dashboard', name: 'Business Dashboard', component: BusinessDashboard },
];

export default routes;
