import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { BackToTop } from './shared/back-to-top/back-to-top';
import { ToastComponent } from './shared/toast/toast.component';

// CORRECT IMPORT: Use 'inject' for Angular, not the React Component
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    BackToTop,
    ToastComponent
  ],
  template: `
    <app-header></app-header>
    <app-toast></app-toast>
    <router-outlet></router-outlet>
    <app-back-to-top></app-back-to-top>
    <app-footer></app-footer>
  `,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'palmsure-corp-v2';

  ngOnInit() {
    // Initialize Vercel Analytics
    // This will automatically track page views in production
    inject();
  }
}
