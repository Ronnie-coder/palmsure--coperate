import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, HostListener, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements AfterViewInit {
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
  @ViewChild('navContainer') navContainer!: ElementRef;
  @ViewChild('palmIcon') palmIcon!: ElementRef;

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isMobileMenuOpen = false;
  isScrolled = false;
  selectorStyle = { top: '0px', left: '0px', width: '0px', height: '0px' };

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateSelector(), 150);

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => this.updateSelector(), 150);
      });
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateSelector(), 100);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPos = window.scrollY;
      this.isScrolled = scrollPos > 50;
      if (!this.isScrolled) {
        setTimeout(() => this.updateSelector(), 300);
      }
    }
  }

  updateSelector() {
    if (!isPlatformBrowser(this.platformId) || this.isScrolled) return;
    if (!this.navContainer || !this.navItems) return;

    const activeItem = this.navItems.find(item => item.nativeElement.classList.contains('active'));

    if (activeItem) {
      const containerRect = this.navContainer.nativeElement.getBoundingClientRect();
      const itemRect = activeItem.nativeElement.getBoundingClientRect();

      this.selectorStyle = {
        top: (itemRect.top - containerRect.top) + 'px',
        left: (itemRect.left - containerRect.left) + 'px',
        width: itemRect.width + 'px',
        height: itemRect.height + 'px'
      };
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen && isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateSelector(), 300);
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  hoverLogo() {
    if (isPlatformBrowser(this.platformId) && this.palmIcon) {
      gsap.to(this.palmIcon.nativeElement, { rotation: 8, scale: 1.1, duration: 0.3, ease: 'power2.out', transformOrigin: 'bottom center' });
    }
  }

  resetLogo() {
    if (isPlatformBrowser(this.platformId) && this.palmIcon) {
      gsap.to(this.palmIcon.nativeElement, { rotation: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    }
  }
}
