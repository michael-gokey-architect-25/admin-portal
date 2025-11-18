// src/app/shared/components/loading-spinner/loading-spinner.component.ts
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'secondary' | 'white' = 'primary';
  @Input() message = '';
  @Input() fullscreen = false;
  @Input() inline = false;

  getWrapperClasses(): string {
    const classes = ['spinner-wrapper'];

    if (this.fullscreen) {
      classes.push('spinner-wrapper-fullscreen');
    } else if (this.inline) {
      classes.push('spinner-wrapper-inline');
    }

    return classes.join(' ');
  }

  getSpinnerClasses(): string {
    return `spinner spinner-${this.size} spinner-${this.color}`;
  }

}

