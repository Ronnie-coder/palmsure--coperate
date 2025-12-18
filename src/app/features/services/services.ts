import { Component, AfterViewInit, OnDestroy, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

// Define the shape of our data
type ServiceOffering = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  // FIXED: Changed to plural 'styleUrls' for safety
  styleUrls: ['./services.scss']
})
export class Services implements AfterViewInit, OnDestroy {
  // Element references for scroll animations
  @ViewChildren('serviceCard', { read: ElementRef }) serviceCards!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('offeringItem', { read: ElementRef }) offeringItems!: QueryList<ElementRef<HTMLElement>>;

  private observer: IntersectionObserver | undefined;

  services: ServiceOffering[] = [
    {
      id: 'property',
      icon: 'home_work',
      title: 'Property Insurance',
      description: 'Comprehensive coverage for your residential and commercial properties against fire, theft, and natural disasters.'
    },
    {
      id: 'vehicle',
      icon: 'directions_car',
      title: 'Vehicle Insurance',
      description: 'Reliable protection for personal and fleet vehicles, ensuring you stay mobile with minimal downtime.'
    },
    {
      id: 'business',
      icon: 'business_center',
      title: 'Business Insurance',
      description: 'Tailored liability and asset protection solutions to safeguard your business continuity.'
    },
    {
      id: 'personal',
      icon: 'person',
      title: 'Personal Insurance',
      description: 'Secure your personal valuables, devices, and lifestyle with our specialized insurance products.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
    }
  }

  private initializeObserver(): void {
    const options = { threshold: 0.2 };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.serviceCards.forEach(card => this.observer?.observe(card.nativeElement));
    this.offeringItems.forEach(item => this.observer?.observe(item.nativeElement));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
