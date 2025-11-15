import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Loader} from './shared/components/loader/loader';
import {NgIf} from '@angular/common';
import {Navbar} from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, NgIf, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 6000);
  }
}
