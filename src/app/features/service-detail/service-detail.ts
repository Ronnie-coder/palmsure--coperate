import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// IMPORT YOUR TESTIMONIALS COMPONENT HERE:
// import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';

interface KeyFeature {
  text: string;
  icon: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  keyFeatures: KeyFeature[];
  imageUrl: string;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
    // Add TestimonialsComponent here once imported above
  ],
  templateUrl: './service-detail.html',
  styleUrls: ['./service-detail.scss']
})
export class ServiceDetail implements OnInit {
  service: Service | undefined;

  private allServices: Service[] = [
    {
      id: 'property',
      title: 'Property Insurance',
      description: 'Secure your most valuable asset. Our comprehensive property insurance protects your home and belongings from unforeseen events.',
      keyFeatures: [
        { text: 'Coverage against fire, theft, and natural disasters', icon: 'local_fire_department' },
        { text: 'Liability protection for accidents on your property', icon: 'gavel' },
        { text: 'Flexible policy options to suit your needs', icon: 'tune' },
        { text: 'Optional coverage for high-value items', icon: 'diamond' }
      ],
      imageUrl: 'assets/images/service-property.jpg'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Insurance',
      description: 'On the road, the unexpected can happen. Our vehicle insurance provides robust protection for your car, truck, or motorcycle.',
      keyFeatures: [
        { text: 'Comprehensive, third-party, and liability-only options', icon: 'policy' },
        { text: 'Roadside assistance and towing services', icon: 'car_crash' },
        { text: 'Coverage for personal and commercial vehicles', icon: 'local_shipping' },
        { text: 'Fast and fair claims processing', icon: 'bolt' }
      ],
      imageUrl: 'assets/images/service-vehicle.jpg'
    },
    {
      id: 'business',
      title: 'Business Insurance',
      description: 'Protect the business you’ve worked so hard to build. We offer tailored insurance solutions that cover your commercial property, liability, and employees.',
      keyFeatures: [
        { text: 'Commercial property and asset protection', icon: 'domain' },
        { text: 'Public and employer’s liability coverage', icon: 'groups' },
        { text: 'Business interruption insurance', icon: 'hourglass_disabled' },
        { text: 'Customized packages for various industries', icon: 'category' }
      ],
      imageUrl: 'assets/images/service-business.jpg'
    },
    {
      id: 'personal',
      title: 'Personal Insurance',
      description: 'Safeguard your future and protect your loved ones with our personal insurance solutions. From life cover to income protection.',
      keyFeatures: [
        { text: 'Life and Disability Cover', icon: 'health_and_safety' },
        { text: 'Comprehensive Income Protection Plans', icon: 'account_balance_wallet' },
        { text: 'Critical Illness Insurance', icon: 'emergency' },
        { text: 'Retirement and Long-Term Savings Solutions', icon: 'savings' }
      ],
      imageUrl: 'assets/images/service-personal.jpg'
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceId = params.get('id');
      if (serviceId) {
        this.service = this.allServices.find(s => s.id === serviceId);

        if (this.service) {
          this.updateSEO(this.service);

          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.initGSAPAnimations(), 150);
          }
        }
      }
    });
  }

  private updateSEO(service: Service) {
    this.titleService.setTitle(`${service.title} | Palmsure Insurance Brokers`);
    this.metaService.updateTag({ name: 'description', content: service.description });
  }

  private initGSAPAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Text Reveal
    gsap.fromTo('.hero-content-wrapper > *',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );

    // 2. Hero Background Parallax
    gsap.to('.hero-parallax-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.service-hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });

    // 3. Feature Items Stagger
    gsap.fromTo('.feature-item',
      { x: -30, opacity: 0 },
      { scrollTrigger: { trigger: '.features', start: 'top 80%', once: true }, x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
    );

    // 4. Detail Side-Image Parallax
    gsap.to('.service-parallax-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: '.service-image-container', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });

    // 5. CTA Bridge Parallax
    gsap.to('.cta-parallax-bg', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });
  }
}
