import { Component, OnInit } from '@angular/core';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrls: ['./loader.scss']
})
export class Loader implements OnInit {
  ngOnInit(): void {
    this.animateSequence();
  }

  async animateSequence(): Promise<void> {
    const cart = document.querySelector('#cart img') as HTMLElement;
    const title = document.querySelector('.title') as HTMLElement;
    const subtitle = document.querySelector('.subtitle') as HTMLElement;

    if (!cart || !title || !subtitle) return;

    await (animate as any)(
      cart,
      { transform: ['translateX(-300%)', 'translateX(0%)'] },
      { duration: 2.2, easing: 'ease-out' }
    ).finished;

    await (animate as any)(
      cart,
      { transform: ['rotate(0deg)', 'rotate(-12deg)', 'rotate(8deg)', 'rotate(0deg)'] },
      { duration: 1.4, easing: 'ease-in-out' }
    ).finished;

    await (animate as any)(
      '.text',
      { transform: ['translateY(60px)', 'translateY(0px)'], opacity: [0, 1] },
      { duration: 0.1, easing: 'ease-out' }
    ).finished;

    (animate as any)(
      [title, subtitle],
      { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
      { duration: 1, delay: stagger(0.3), easing: 'ease-out' }
    );
  }
}
