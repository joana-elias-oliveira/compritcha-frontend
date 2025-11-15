import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  overlayRef?: OverlayRef;

  get iconName(): string {
    switch (this.type) {
      case 'success': return 'check_circle';
      case 'error': return 'block';
      case 'info': return 'info';
      case 'warning': return 'warning';
      default: return 'notifications';
    }
  }

  destroy() {
    this.overlayRef?.dispose();
  }
}
