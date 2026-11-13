import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({ selector:'app-soporte', standalone:true, imports:[FormsModule,RouterLink], templateUrl:'./soporte.component.html' })
export class SoporteComponent {
  nombre = '';
  consulta = '';
  calificacion = '5';
  mensaje = '';
  enviar(): void {
    if (!this.nombre.trim() || !this.consulta.trim()) {
      this.mensaje = 'Por favor, ingresa tu nombre y una consulta.';
      return;
    }
    this.mensaje = `Gracias, ${this.nombre.trim()}. Tu mensaje se registró en la demostración (no se envió a un servidor).`;
    this.consulta = '';
  }
}
