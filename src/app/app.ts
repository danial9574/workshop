import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule, 
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
/*   protected readonly title = signal('ceasar');
  isHomePage: boolean = false;
  isCaesarPage: boolean = false;
  isCodeCubePage: boolean = false;
constructor(private router : Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCaesarPage = event.url === '/Cäsar';
        this.isCodeCubePage = event.url === '/kodierwuerfel';
      }
    });
  } */
}
