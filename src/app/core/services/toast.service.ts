import { Injectable, inject } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private overlay = inject(Overlay);

  show(
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration = 6000
  ) {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .top('20px')
        .right('20px'),
      hasBackdrop: false,
      panelClass: 'toast-overlay',
    });

    const toastPortal = new ComponentPortal(ToastComponent);
    const componentRef = overlayRef.attach(toastPortal);

    componentRef.instance.title = title;
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    componentRef.instance.overlayRef = overlayRef;

    setTimeout(() => overlayRef.dispose(), duration);
  }
}
