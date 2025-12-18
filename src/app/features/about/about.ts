import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  // FIXED: Using 'styleUrls' (plural) ensures compatibility
  styleUrls: ['./about.scss']
})
export class About implements AfterViewInit, OnDestroy {
  @ViewChild('metricsSection') metricsSection!: ElementRef<HTMLElement>;
  @ViewChildren('metricValue') metricValues!: QueryList<ElementRef<HTMLSpanElement>>;

  private observer: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
    }
  }

  private initializeObserver(): void {
    const options = { threshold: 0.5 };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.metricsSection.nativeElement.classList.add('is-visible');
          this.animateMetricNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observer.observe(this.metricsSection.nativeElement);
  }

  private animateMetricNumbers(): void {
    this.metricValues.forEach(elRef => {
      const element = elRef.nativeElement;
      const originalText = element.textContent || '0';
      const targetValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
      const suffix = originalText.replace(/[0-9.]/g, '');

      this.countUp(element, targetValue, suffix);
    });
  }

  private countUp(element: HTMLElement, target: number, suffix: string): void {
    const duration = 2000;
    const startTimestamp = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(easeOut * target);
      element.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString() + suffix;
      }
    };

    window.requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
