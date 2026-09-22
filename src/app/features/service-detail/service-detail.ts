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
      description: 'Your property is your most valuable asset. We source and negotiate comprehensive building and contents cover from top underwriters to ensure total peace of mind',
      keyFeatures: [
        { text: 'Negotiated Cover for Fire, Theft & Natural Disasters', icon: 'local_fire_department' },
        { text: 'Comprehensive Personal Liability Protection', icon: 'gavel' },
        { text: 'Flexible, Market-Compared Policy Structures', icon: 'tune' },
        { text: 'Specialized All-Risk Cover for High-Value Assets', icon: 'diamond' }
      ],
      imageUrl: 'assets/images/service-property.jpg'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Insurance',
      description: 'Whether it is your daily drive or a commercial fleet, we compare quotes across the market to secure the most competitive, robust motor cover available.',
      keyFeatures: [
        { text: 'Market-Compared Comprehensive & Liability Options', icon: 'policy' },
        { text: 'Integrated Roadside Assistance & Towing Benefits', icon: 'car_crash' },
        { text: 'Tailored Cover for Personal & Commercial Vehicles', icon: 'local_shipping' },
        { text: 'Dedicated Claims Advocacy & Expedited Resolutions', icon: 'bolt' }
      ],
      imageUrl: 'assets/images/service-vehicle.jpg'
    },
    {
      id: 'business',
      title: 'Business Insurance',
      description: 'Focus on running your business while we navigate the commercial market. We negotiate custom risk portfolios to protect your assets, liabilities, and bottom line.',
      keyFeatures: [
        { text: 'Tailored Commercial Property & Asset Cover', icon: 'domain' },
        { text: 'Specialized Public & Employer Liability', icon: 'groups' },
        { text: 'Strategic Business Interruption Solutions', icon: 'hourglass_disabled' },
        { text: 'Industry-Specific Risk Portfolios', icon: 'category' }
      ],
      imageUrl: 'assets/images/service-business.jpg'
    },
    {
      id: 'personal',
      title: 'Personal Insurance',
      description: 'We analyze your unique lifestyle to source and structure the perfect personal risk portfolio, expertly negotiated to protect your loved ones.',
      keyFeatures: [
        { text: 'Market-Leading Life & Disability Cover', icon: 'health_and_safety' },
        { text: 'Tailored Income Protection Plans', icon: 'account_balance_wallet' },
        { text: 'Specialized Critical Illness Cover', icon: 'emergency' },
        { text: 'Strategic Retirement & Savings Solutions', icon: 'savings' }
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
