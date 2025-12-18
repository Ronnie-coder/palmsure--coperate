import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast$ | async as toast" class="toast-container" [ngClass]="toast.type">
      <div class="toast-content">
        <span class="material-symbols-outlined icon">
          {{ toast.type === 'success' ? 'check_circle' : 'error' }}
        </span>
        <span>{{ toast.message }}</span>
      </div>
      <button (click)="close()" class="close-btn">×</button>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed; top: 20px; right: 20px; z-index: 9999;
      min-width: 320px; padding: 16px; border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      animation: slideIn 0.3s cubic-bezier(0.21, 1.02, 0.73, 1);
      color: white; font-family: sans-serif;
    }
    .toast-content { display: flex; align-items: center; gap: 12px; font-weight: 500; }
    .icon { font-size: 1.4rem; }
    .close-btn { background: none; border: none; color: rgba(255,255,255,0.8); font-size: 1.5rem; cursor: pointer; margin-left: auto; padding: 0; line-height: 1; }
    .close-btn:hover { color: white; }

    /* Theme Colors */
    .success { background-color: #1A5A4A; } /* Palmsure Green */
    .error { background-color: #d32f2f; }
    .info { background-color: #0288d1; }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  // We declare the property here, but we do not assign it yet
  toast$;

  constructor(private toastService: ToastService) {
    // We assign it inside the constructor, where toastService is ready
    this.toast$ = this.toastService.toast$;
  }

  close() {
    this.toastService.clear();
  }
}
