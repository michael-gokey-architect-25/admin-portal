// src/app/shared/components/card/card.component.ts
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title = '';
  @Input() variant: 'default' | 'bordered' | 'elevated' = 'default';
  @Input() hoverable = false;
  @Input() compact = false;

  hasHeaderContent = false;
  hasFooterContent = false;

  ngAfterContentInit(): void {
    // Check if header/footer content is projected
    // This is a simplified check - in production, use ContentChild
  }

  getCardClasses(): string {
    const classes = ['card'];

    if (this.variant === 'bordered') {
      classes.push('card-bordered');
    } else if (this.variant === 'elevated') {
      classes.push('card-elevated');
    }

    if (this.hoverable) {
      classes.push('card-hoverable');
    }

    if (this.compact) {
      classes.push('card-body-compact');
    }

    return classes.join(' ');
  }

}

