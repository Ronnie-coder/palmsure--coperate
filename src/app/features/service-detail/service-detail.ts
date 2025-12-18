import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // SEO Imports

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
  imports: [CommonModule, RouterModule],
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
    private route: ActivatedRoute,
    private titleService: Title, // Inject SEO Title Service
    private metaService: Meta    // Inject SEO Meta Service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const serviceId = params.get('id');
      if (serviceId) {
        this.service = this.allServices.find(s => s.id === serviceId);

        // SEO MAGIC: Update the browser title and description dynamically
        if (this.service) {
          this.updateSEO(this.service);
        }
      }
    });
  }

  private updateSEO(service: Service) {
    // Sets tab title to: Property Insurance | Palmsure
    this.titleService.setTitle(`${service.title} | Palmsure Insurance`);

    // Updates Meta Description for Google
    this.metaService.updateTag({
      name: 'description',
      content: service.description
    });
  }
}
