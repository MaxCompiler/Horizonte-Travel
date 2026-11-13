import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre = '';
  usuario = '';
  clave = '';
  confirmarClave = '';
  mostrarClave = false;
  mensaje = '';
  exito = false;
  guardando = false;

  constructor(private auth: AuthService, private router: Router) {}

  async registrar(): Promise<void> {
    if (this.guardando) return;
    this.mensaje = '';
    this.exito = false;
    this.guardando = true;
    try {
      const resultado = await this.auth.registrarUsuario(
        this.nombre, this.usuario, this.clave, this.confirmarClave
      );
      this.mensaje = resultado.mensaje;
      this.exito = resultado.correcto;
      if (resultado.correcto) {
        // El registro no inicia sesión automáticamente: se confirma el acceso desde Login.
        await this.router.navigate(['/login'], {
          queryParams: { registrado: '1' }
        });
      }
    } catch {
      this.mensaje = 'No fue posible completar el registro en este navegador.';
    } finally {
      this.guardando = false;
    }
  }
}
