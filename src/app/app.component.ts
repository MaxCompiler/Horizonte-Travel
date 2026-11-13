import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mostrarAcercaDe = false;

  constructor(public auth: AuthService, private router: Router) {}

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.mostrarAcercaDe = false;
    this.router.navigate(['/login']);
  }

  alternarAcercaDe(): void {
    this.mostrarAcercaDe = !this.mostrarAcercaDe;
  }
}
