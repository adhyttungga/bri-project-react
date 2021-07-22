import React from 'react';

const BusinessDashboard = React.lazy(() => import('./views/dashboard/BusinessDashboard'));
const BusinessValue = React.lazy(() => import('./views/dashboard/BusinessValue'));
const Criticality = React.lazy(() => import('./views/dashboard/Criticality'))
const ArchitectureCharacter = React.lazy(() => import('./views/dashboard/ArchitectureCharacter'))
const BusinessCharacter = React.lazy(() => import('./views/dashboard/BusinessCharacter'))
const TechnicalQuality = React.lazy(() => import('./views/dashboard/TechnicalQuality'))
const InvestmentCharacter = React.lazy(() => import('./views/dashboard/InvestmentCharacter'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: BusinessDashboard, exact: true },
  { path: '/dashboard/business-dashboard', name: 'Business Dashboard', component: BusinessDashboard },
  { path: '/dashboard/business-value', name: 'Business Value', component: BusinessValue },
  { path: '/dashboard/criticality', name: 'Criticality', component: Criticality},
  { path: '/dashboard/architecture-character', name: 'Architecture Character', component: ArchitectureCharacter },
  { path: '/dashboard/business-character', name: 'Business Character', component: BusinessCharacter },
  { path: '/dashboard/technical-quality', name: 'Technical Quality', component: TechnicalQuality },
  { path: '/dashboard/investment-character', name: 'Investment Character', component: InvestmentCharacter },
];

export default routes;
