import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Review {
  name: string;
  role: string;
  text: string;
  image?: string;
  ratingEmoji?: string;
  badgeEmoji?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Testimonials implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation: gsap.core.Tween | undefined;

  activeIndex = 0;

  reviews: Review[] = [
    {
      name: 'Yanga Gxaba',
      role: 'Client',
      text: 'I had a pleasant experience with the registration of the insurance and the fast responses received. I love the fact I was called when I had a question about anything. Very much satisfied with everything from beginning to end.',
      ratingEmoji: '⭐⭐⭐⭐⭐',
      badgeEmoji: '🙌'
    },
    {
      name: 'Z Tu',
      role: 'Client',
      text: 'I am very happy with your service. You truly go above and beyond and show how deeply you care about your clients.',
      ratingEmoji: '⭐⭐⭐⭐⭐',
      badgeEmoji: '❤️'
    },
    {
      name: 'Makwande Zimela',
      role: 'Driver',
      text: 'Ndithathe ithuba ndibulele kuwe mnumzana Ronnie ngokundinceda. Ndithe ngofika kwam kwi Palmsure wandamkela ngezandla ezishushu. Xa ndifaka i-claim wandinceda ngazo zonke izinto edingekayo. Qhubeka usenza kakuhle. Enkosi kakhulu.',
      ratingEmoji: '⭐⭐⭐⭐⭐',
      badgeEmoji: '🚗'
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        gsap.registerPlugin(ScrollTrigger);

        this.scrollAnimation = gsap.from('.testimonials-header, .slider-viewport', {
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 85%',
            once: true
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          clearProps: 'all'
        });

        ScrollTrigger.refresh();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollAnimation) {
      this.scrollAnimation.scrollTrigger?.kill();
      this.scrollAnimation.kill();
    }
  }

  nextReview(): void {
    this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
  }
}
