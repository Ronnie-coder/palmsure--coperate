import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { BackToTop } from './shared/back-to-top/back-to-top';
import { ToastComponent } from './shared/toast/toast.component';

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
  // We use an inline template here to ensure the Toast and BackToTop are rendered on every page
  template: `
    <app-header></app-header>
    <app-toast></app-toast>
    <router-outlet></router-outlet>
    <app-back-to-top></app-back-to-top>
    <app-footer></app-footer>
  `,
  styleUrl: './app.scss'
})
export class App {
  title = 'palmsure-corp-v2';
}
