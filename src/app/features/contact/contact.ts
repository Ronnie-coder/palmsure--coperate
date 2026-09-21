import { Component, AfterViewInit, PLATFORM_ID, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Contact implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private fb = inject(FormBuilder);

  contactForm!: FormGroup;
  isSubmitting = false;
  activeMap: 'cape-town' | 'mthatha' = 'cape-town';

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us | Palmsure Insurance Brokers');
    this.metaService.updateTag({ name: 'description', content: 'Get in touch with Palmsure Insurance Brokers. We are here to help with all your insurance needs.' });

    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      setTimeout(() => {
        this.initGSAPAnimations();
      }, 200);
    }
  }

  selectMap(map: 'cape-town' | 'mthatha'): void {
    this.activeMap = map;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.contactForm.reset();
      alert('Thank you for reaching out! We will get back to you shortly.');
    }, 1500);
  }

  private initGSAPAnimations(): void {
    // 1. Hero Reveal
    gsap.fromTo('.hero-content > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );

    // 2. Hero Lottie Parallax
    gsap.to('.hero-animation', {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });

    // 3. Info Panel Slide in
    gsap.fromTo('.info-panel',
      { x: -50, opacity: 0 },
      { scrollTrigger: { trigger: '.main-content-section', start: 'top 80%', once: true }, x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // 4. Form Panel Slide in
    gsap.fromTo('.form-panel',
      { x: 50, opacity: 0 },
      { scrollTrigger: { trigger: '.main-content-section', start: 'top 80%', once: true }, x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );

    // 5. Map Reveal
    gsap.fromTo('.map-section',
      { y: 50, opacity: 0 },
      { scrollTrigger: { trigger: '.map-section', start: 'top 85%', once: true }, y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }
}
