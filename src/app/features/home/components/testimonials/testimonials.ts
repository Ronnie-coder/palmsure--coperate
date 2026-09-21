import { Component, AfterViewInit, PLATFORM_ID, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Review {
  name: string;
  role: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Testimonials implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  activeIndex = 0;

  reviews: Review[] = [
    {
      name: 'Yanga Gxaba',
      role: 'Client',
      text: 'I had a pleasant experience with the registration of the insurance and the fast responses received. I love the fact I was called when I had a question about anything. Very much satisfied with everything from beginning to end.'
    },
    {
      name: 'Z Tu',
      role: 'Client',
      text: 'I am very happy with your service. You truly go above and beyond and show how deeply you care about your clients.'
    },
    {
      name: 'Makwande Zimela',
      role: 'Driver',
      text: 'Ndithathe ithuba ndibulele kuwe mnumzana Ronnie ngokundinceda. Ndithe ngofika kwam kwi Palmsure wandamkela ngezandla ezishushu. Xa ndifaka i-claim wandinceda ngazo zonke izinto edingekayo. Qhubeka usenza kakuhle. Enkosi kakhulu.'
    }
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo('.testimonials-section',
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%', once: true }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }

  nextReview(): void {
    this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
  }
}
