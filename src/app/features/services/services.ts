import { Component, AfterViewInit, PLATFORM_ID, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ServiceOffering {
  id: string;
  image: string;
  title: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Services implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  services: ServiceOffering[] = [
    { id: 'personal', image: 'assets/images/service-personal.jpg', title: 'Personal Insurance' },
    { id: 'property', image: 'assets/images/service-property.jpg', title: 'Property Insurance' },
    { id: 'vehicle', image: 'assets/images/service-vehicle.jpg', title: 'Vehicle Insurance' },
    { id: 'business', image: 'assets/images/service-business.jpg', title: 'Business Insurance' }
  ];

  ngOnInit(): void {
    this.titleService.setTitle('Our Solutions | Palmsure Insurance Brokers');
    this.metaService.updateTag({ name: 'description', content: 'Comprehensive insurance solutions tailored to protect what matters most to you.' });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.initGSAPAnimations();
      }, 200);
    }
  }

  private initGSAPAnimations(): void {
    gsap.fromTo('.hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    gsap.to('.hero-animation', {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });

    gsap.fromTo('.service-image-card',
      { y: 50, opacity: 0 },
      { scrollTrigger: { trigger: '.core-services-section', start: 'top 80%', once: true }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );

    gsap.fromTo('.offering-item',
      { x: -30, opacity: 0 },
      { scrollTrigger: { trigger: '.core-offerings-section', start: 'top 80%', once: true }, x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );

    gsap.fromTo('.offerings-image',
      { scale: 1.1 },
      { scrollTrigger: { trigger: '.core-offerings-section', start: 'top bottom', end: 'bottom top', scrub: true }, scale: 1, ease: 'none' }
    );

    gsap.fromTo('.feature-card',
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: '.why-choose-us-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    );

    gsap.to('.cta-parallax-bg', {
      yPercent: 20, ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });
  }
}
