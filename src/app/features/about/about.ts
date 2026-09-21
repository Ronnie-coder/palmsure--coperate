import { Component, AfterViewInit, ElementRef, PLATFORM_ID, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class About implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private el = inject(ElementRef);

  ngOnInit(): void {
    this.titleService.setTitle('Our Story | Palmsure Insurance Brokers');
    this.metaService.updateTag({ name: 'description', content: 'Founded in 2016, Palmsure Insurance Brokers has evolved into a comprehensive insurance powerhouse.' });
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
    gsap.fromTo('.hero-content > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1 });
    gsap.fromTo('.impact-pill', { y: 50, opacity: 0 }, { scrollTrigger: { trigger: '.impact-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' });

    gsap.to('.parallax-bg', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: '.founder-card', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });

    gsap.fromTo('.mission-block', { y: 30 }, { scrollTrigger: { trigger: '.mission-vision-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 }, y: -30, ease: 'none' });
    gsap.fromTo('.vision-block', { y: 60 }, { scrollTrigger: { trigger: '.mission-vision-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 }, y: -60, ease: 'none' });
    gsap.fromTo('.team-member-card', { y: 30, opacity: 0 }, { scrollTrigger: { trigger: '.team-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
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
