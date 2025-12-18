import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { EmailService } from '../../core/services/email.service';
import { ToastService } from '../../core/services/toast.service'; // <-- Import ToastService

interface InsuranceType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './quote.html',
  styleUrls: ['./quote.scss']
})
export class Quote implements OnInit {
  currentStep: number = 1;
  isSubmitting: boolean = false;

  insuranceTypes: InsuranceType[] = [
    { id: 'property', name: 'Property', description: 'Home and personal belongings.', icon: 'home_work' },
    { id: 'vehicle', name: 'Vehicle', description: 'Personal or commercial vehicles.', icon: 'directions_car' },
    { id: 'business', name: 'Business', description: 'Assets, liability, and operations.', icon: 'business_center' }
  ];
  selectedInsuranceType: string | null = null;

  personalDetailsForm!: FormGroup;
  propertyDetailsForm!: FormGroup;
  vehicleDetailsForm!: FormGroup;
  businessDetailsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private metaService: Meta,
    private emailService: EmailService,
    private toast: ToastService // <-- Inject ToastService
  ) {}

  ngOnInit(): void {
    // SEO SETUP
    this.titleService.setTitle('Get a Quote | Palmsure Insurance Brokers');
    this.metaService.updateTag({
      name: 'description',
      content: 'Request a personalized insurance quote from Palmsure. Quick, easy, and tailored to your specific needs.'
    });

    // FORM SETUP
    this.personalDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9-+\\s()]*$')]]
    });

    this.propertyDetailsForm = this.fb.group({
      propertyAddress: ['', Validators.required],
      propertyValue: ['', [Validators.required, Validators.min(50000)]]
    });

    this.vehicleDetailsForm = this.fb.group({
      vehicleMake: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehicleYear: ['', [Validators.required, Validators.min(1980), Validators.max(new Date().getFullYear() + 1)]]
    });

    this.businessDetailsForm = this.fb.group({
      businessName: ['', Validators.required],
      industry: ['', Validators.required],
      numEmployees: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Getters
  get p() { return this.personalDetailsForm.controls; }
  get prop() { return this.propertyDetailsForm.controls; }
  get veh() { return this.vehicleDetailsForm.controls; }
  get biz() { return this.businessDetailsForm.controls; }

  selectInsuranceType(typeId: string): void {
    this.selectedInsuranceType = typeId;
  }

  goToNextStep(): void {
    if (this.currentStep === 1 && this.selectedInsuranceType) {
      this.currentStep++;
    } else if (this.currentStep === 2) {
      if (this.personalDetailsForm.invalid) {
        this.personalDetailsForm.markAllAsTouched();
        this.toast.show('Please fill in all personal details.', 'error'); // <-- Added Toast
        return;
      }
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitQuote(): void {
    const specificsFormMap: { [key: string]: FormGroup } = {
      property: this.propertyDetailsForm,
      vehicle: this.vehicleDetailsForm,
      business: this.businessDetailsForm
    };
    const specifics = this.selectedInsuranceType ? specificsFormMap[this.selectedInsuranceType] : null;

    if (!specifics || specifics.invalid) {
      specifics?.markAllAsTouched();
      this.toast.show('Please fill in the missing details.', 'error'); // <-- Added Toast
      return;
    }

    // --- SEND EMAIL LOGIC ---
    this.isSubmitting = true;

    this.emailService.sendQuoteRequest(
      this.selectedInsuranceType!,
      this.personalDetailsForm.value,
      specifics.value
    ).subscribe({
      next: () => {
        // Success! Move to Step 4 (Thank You Screen)
        this.isSubmitting = false;
        this.currentStep = 4;
        this.toast.show('Quote request sent successfully!', 'success'); // <-- Added Toast

        // Reset forms optionally
        this.personalDetailsForm.reset();
        specifics.reset();
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Email failed:', err);
        this.isSubmitting = false;
        // Show error toast
        this.toast.show('Connection error. Please call 021 699 8370.', 'error'); // <-- Added Toast
      }
    });
  }
}
