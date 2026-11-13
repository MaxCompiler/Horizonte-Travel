import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  clave = '';
  mostrarClave = false;
  mensaje = '';

  registroExitoso = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.registroExitoso = this.route.snapshot.queryParamMap.get('registrado') === '1';
  }

  async aceptar(): Promise<void> {

    alert("Se procederá a validar las credenciales de acceso");
    
    if (!this.usuario.trim() || !this.clave) {
      this.mensaje = 'Ingresa tu usuario y contraseña.';
      return;
    }
    if (await this.auth.iniciarSesion(this.usuario, this.clave)) {
      this.mensaje = '';
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = 'Error en credenciales. Verifica tu usuario y contraseña.';
    }
  }
}
