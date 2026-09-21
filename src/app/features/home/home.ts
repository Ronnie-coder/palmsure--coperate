import { Component, AfterViewInit, ElementRef, PLATFORM_ID, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FIX: Corrected relative path based on your folder structure
import { Testimonials } from './components/testimonials/testimonials';

interface InsuranceService {
  id: string;
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Testimonials],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private el = inject(ElementRef);

  services: InsuranceService[] = [
    {
      id: 'personal',
      title: 'Personal Insurance',
      image: 'assets/images/service-personal.jpg',
      description: 'Comprehensive coverage tailored for individuals and families.'
    },
    {
      id: 'property',
      title: 'Property Insurance',
      image: 'assets/images/service-property.jpg',
      description: 'Comprehensive coverage against fire, theft, and natural disasters for your home.'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Insurance',
      image: 'assets/images/service-vehicle.jpg',
      description: 'Protection for private cars, e-hailing (Uber/Bolt), taxis, and commercial fleets.'
    },
    {
      id: 'business',
      title: 'Business Insurance',
      image: 'assets/images/service-business.jpg',
      description: 'Risk management, liability, and bespoke coverage for your enterprise.'
    }
  ];

  ngOnInit(): void {
    this.titleService.setTitle('Palmsure Insurance Brokers | Cape Town & Mthatha');
    this.metaService.updateTag({ name: 'description', content: 'Palmsure provides reliable Personal, Business, and Vehicle insurance. We compare top underwriters and handle your policy administration.' });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.initGSAPAnimations();
        this.initCounterAnimations();
      }, 200);
    }
  }

  private initGSAPAnimations(): void {
    gsap.fromTo('.hero-content > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
    gsap.to('.hero-animation', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.5 } });
    gsap.fromTo('.impact-pill', { y: 40, opacity: 0 }, { scrollTrigger: { trigger: '.impact-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.feature-card', { y: 40, opacity: 0 }, { scrollTrigger: { trigger: '.features-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
    gsap.fromTo('.solution-image-card', { y: 50, opacity: 0 }, { scrollTrigger: { trigger: '.solutions-section', start: 'top 80%', once: true }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
    gsap.to('.cta-parallax-bg', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  }

  private initCounterAnimations(): void {
    const counters = this.el.nativeElement.querySelectorAll('.counter');
    counters.forEach((counter: HTMLElement) => {
      const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: targetValue,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: counter, start: 'top 95%', once: true },
        onUpdate: () => { counter.innerText = Math.ceil(proxy.val).toString(); }
      });
    });
  }
}
