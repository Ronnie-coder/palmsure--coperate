import { Component, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

export interface Resource {
  category: string;
  title: string;
  excerpt: string;
  content: string;
}

@Component({
  selector: 'app-resources-hub',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './resources-hub.html',
  styleUrl: './resources-hub.scss',
  animations: [
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ]),
    ]),
  ]
})
export class ResourcesHubComponent implements OnDestroy {

  selectedResource: Resource | null = null;

  // We inject the platform ID to safely check if we are running in the browser vs the server
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // --- COMPLETE DATA SET WITH ALL SIX ARTICLES ---
  resources: Resource[] = [
    {
      category: 'AUTO INSURANCE',
      title: 'Understanding Your Deductible',
      excerpt: 'Learn how your deductible impacts your premium and what to consider when choosing one.',
      content: `
        <p>Your auto insurance deductible is the amount of money you agree to pay out-of-pocket for damages before your insurance coverage kicks in. For example, if you have a $500 deductible and you file a claim for $2,000 in damages, you would pay the first $500, and Palmsure Insurance would cover the remaining $1,500.</p>
        <p><strong>Choosing the right deductible is a balance:</strong></p>
        <ul>
          <li><strong>Higher Deductible:</strong> Leads to a lower monthly premium, but requires a larger out-of-pocket expense if you have an accident.</li>
          <li><strong>Lower Deductible:</strong> Results in a higher monthly premium, but reduces your financial burden at the time of a claim.</li>
        </ul>
        <p>Consider your emergency savings and risk tolerance when making this crucial decision. Our agents are always available to help you find the perfect balance for your budget and peace of mind.</p>
      `
    },
    {
      category: 'HOME INSURANCE',
      title: 'What Is "Replacement Cost" vs. "Actual Cash Value"?',
      excerpt: 'Discover the key difference between these two valuation methods and why it matters for your home.',
      content: `
        <p>When insuring your home and personal belongings, understanding valuation is critical. The two primary methods are Replacement Cost Value (RCV) and Actual Cash Value (ACV).</p>
        <p><strong>Actual Cash Value (ACV)</strong> pays for the value of the damaged property at the time of the loss. This means it takes the original cost and subtracts depreciation for age and wear. For example, a 10-year-old roof will be valued much lower than a new one.</p>
        <p><strong>Replacement Cost Value (RCV)</strong>, on the other hand, pays the cost to replace the damaged property with an item of similar kind and quality, without deducting for depreciation. This coverage is essential for ensuring you can fully rebuild your home and replace your belongings after a major loss. Palmsure highly recommends RCV for comprehensive protection.</p>
      `
    },
    {
      category: 'LIFE INSURANCE',
      title: 'Term vs. Whole Life: Which Is Right for You?',
      excerpt: 'A clear breakdown of the two most common types of life insurance to help you decide.',
      content: `
        <p>Choosing a life insurance policy is a foundational step in financial planning. The two main categories are Term and Whole Life.</p>
        <p><strong>Term Life Insurance</strong> provides coverage for a specific period, or "term," such as 10, 20, or 30 years. It's generally more affordable and is designed to cover temporary needs, like paying off a mortgage or funding a child's education if you were no longer around. If you outlive the term, the policy expires.</p>
        <p><strong>Whole Life Insurance</strong> provides lifelong coverage and includes a cash value component that grows over time. This cash value can be borrowed against or withdrawn. It's more expensive but offers permanent protection and acts as a financial asset. The best choice depends on your long-term goals and budget.</p>
      `
    },
    {
      category: 'BUSINESS INSURANCE',
      title: 'The Importance of General Liability Coverage',
      excerpt: 'Every business needs a safety net. Learn why general liability is non-negotiable.',
      content: `
        <p>Commercial General Liability (CGL) insurance is a cornerstone of protection for any business. It safeguards your company from financial loss in the event of bodily injury, property damage, or personal injury caused by your business operations, products, or on your premises.</p>
        <p><strong>Key coverages include:</strong></p>
        <ul>
          <li><strong>Bodily Injury:</strong> A customer slips and falls in your store.</li>
          <li><strong>Property Damage:</strong> Your employee damages a client's property during a service call.</li>
          <li><strong>Personal and Advertising Injury:</strong> Claims of libel, slander, or copyright infringement in your marketing.</li>
        </ul>
        <p>Without CGL, a single lawsuit could be financially devastating. It's an essential investment in your business's longevity and stability.</p>
      `
    },
    {
      category: 'HOME INSURANCE',
      title: 'Protecting Your Home from Water Damage',
      excerpt: 'Proactive steps you can take to prevent one of the most common and costly home insurance claims.',
      content: `
        <p>Water damage is a frequent and expensive headache for homeowners. Prevention is your most effective tool.</p>
        <p><strong>Follow these proactive tips:</strong></p>
        <ul>
          <li><strong>Inspect Hoses and Faucets:</strong> Regularly check appliance hoses (washing machine, dishwasher, refrigerator) for cracks and leaks.</li>
          <li><strong>Know Your Main Water Shutoff:</strong> In an emergency, shutting off the main water supply quickly can save you thousands.</li>
          <li><strong>Maintain Gutters and Downspouts:</strong> Ensure water is directed away from your home's foundation.</li>
          <li><strong>Monitor Your Water Bill:</strong> A sudden spike can indicate an unseen leak that needs immediate attention.</li>
        </ul>
        <p>A little maintenance goes a long way in protecting your largest investment from water-related disasters.</p>
      `
    },
    {
      category: 'AUTO INSURANCE',
      title: 'Do I Need Comprehensive Coverage?',
      excerpt: 'It covers more than just collisions. Find out if this optional coverage is a smart choice for you.',
      content: `
        <p>While liability coverage is required by law, and collision coverage pays for damage to your car from an accident, what about other events? That's where Comprehensive Coverage comes in.</p>
        <p><strong>Comprehensive insurance covers damage to your vehicle from non-collision events, such as:</strong></p>
        <ul>
          <li>Theft and vandalism</li>
          <li>Fire, hail, and flooding</li>
          <li>Falling objects (like a tree branch)</li>
          <li>Collisions with animals (like a deer)</li>
        </ul>
        <p>If you have a newer car, have a loan or lease, or live in an area prone to theft or severe weather, comprehensive coverage is a wise investment to protect your vehicle from the unexpected.</p>
      `
    }
  ];

  openResourceModal(resource: Resource): void {
    this.selectedResource = resource;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeResourceModal(): void {
    this.selectedResource = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }
}
