import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-to-top.html',
  styleUrls: ['./back-to-top.scss'] // Fixed to plural for compatibility
})
export class BackToTop {
  showButton = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Only access window if we are in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.showButton = window.scrollY > 300;
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
