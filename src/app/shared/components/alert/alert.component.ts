// src/app/shared/components/alert/alert.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title = '';
  @Input() dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  dismissed_state = false;

  getAlertClasses(): string {
    return `alert alert-${this.type}`;
  }

  getIcon(): string {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[this.type];
  }

  dismiss(): void {
    this.dismissed_state = true;
    this.dismissed.emit();
  }
}

