import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home | Palmsure',
    loadComponent: () => import('./features/home/home').then(c => c.Home)
  },
  {
    path: 'about',
    title: 'About Us | Palmsure',
    loadComponent: () => import('./features/about/about').then(c => c.About)
  },
  {
    path: 'services',
    title: 'Our Services | Palmsure',
    loadComponent: () => import('./features/services/services').then(c => c.Services)
  },
  {
    path: 'services/:id',
    title: 'Service Details | Palmsure',
    loadComponent: () => import('./features/service-detail/service-detail').then(c => c.ServiceDetail)
  },
  {
    path: 'quote',
    title: 'Get a Quote | Palmsure',
    loadComponent: () => import('./features/quote/quote').then(c => c.Quote)
  },
  {
    path: 'contact',
    title: 'Contact Us | Palmsure',
    loadComponent: () => import('./features/contact/contact').then(c => c.Contact)
  },
  {
    path: 'resources',
    title: 'Resources | Palmsure',
    loadComponent: () => import('./features/resources-hub/resources-hub').then(c => c.ResourcesHubComponent)
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service | Palmsure',
    loadComponent: () => import('./features/terms-of-service/terms-of-service').then(c => c.TermsOfService)
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | Palmsure',
    loadComponent: () => import('./features/privacy-policy/privacy-policy').then(c => c.PrivacyPolicy)
  },
  // --- NEW COMPLIANCE ROUTES ---
  {
    path: 'statutory-disclosures',
    title: 'Statutory Disclosures | Palmsure',
    loadComponent: () => import('./features/statutory-disclosures/statutory-disclosures').then(c => c.StatutoryDisclosuresComponent)
  },
  {
    path: 'complaints-procedure',
    title: 'Complaints Procedure | Palmsure',
    loadComponent: () => import('./features/complaints-procedure/complaints-procedure').then(c => c.ComplaintsProcedureComponent)
  },
  {
    path: 'conflict-of-interest',
    title: 'Conflict of Interest | Palmsure',
    loadComponent: () => import('./features/conflict-of-interest/conflict-of-interest').then(c => c.ConflictOfInterestComponent)
  },
  {
    path: 'paia-manual',
    title: 'PAIA Manual | Palmsure',
    loadComponent: () => import('./features/paia-manual/paia-manual').then(c => c.PaiaManualComponent)
  }
];
