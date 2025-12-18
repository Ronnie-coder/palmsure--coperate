import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { EmailService } from '../../core/services/email.service'; // Import Service

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  contactForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl(''),
    message: new FormControl('', Validators.required)
  });

  activeMap: 'cape-town' | 'mthatha' = 'cape-town';
  isSubmitting = false; // Add loading state

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private emailService: EmailService // Inject Service
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us | Palmsure Insurance Brokers');
    this.metaService.updateTag({ name: 'description', content: 'Get in touch with Palmsure Insurance Brokers.' });
  }

  selectMap(branch: 'cape-town' | 'mthatha'): void {
    this.activeMap = branch;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      this.emailService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          alert('Thank you! Message sent to Roy and the team.');
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error(error);
          alert('Failed to send message. Please try calling us directly.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
