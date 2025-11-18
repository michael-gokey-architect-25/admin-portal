// src/app/shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() block = false;

  @Output() clicked = new EventEmitter<Event>();

  getButtonClasses(): string {
    const classes = [`btn-${this.variant}`];
    
    if (this.size !== 'md') {
      classes.push(`btn-${this.size}`);
    }
    
    if (this.block) {
      classes.push('btn-block');
    }
    
    return classes.join(' ');
  }

  handleClick(event: Event): void {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit(event);
    }
  }
}

