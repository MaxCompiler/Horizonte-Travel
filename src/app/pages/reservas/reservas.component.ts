import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TravelDataService } from '../../services/travel-data.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reservas.component.html'
})
export class ReservasComponent implements OnInit {
  destinoElegido = 'Islas Galápagos';
  fecha = '2026-12-20';
  viajeros = 1;
  error = '';

  constructor(public datos: TravelDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const destino = this.route.snapshot.queryParamMap.get('destino');
    if (destino && this.datos.destinos.some(d => d.nombre === destino)) this.destinoElegido = destino;
  }

  registrar(): void {
    this.error = '';
    if (!this.destinoElegido || !this.fecha || !Number.isInteger(this.viajeros) || this.viajeros < 1 || this.viajeros > 10) {
      this.error = 'Completa los datos de la reserva (entre 1 y 10 viajeros).';
      return;
    }
    // Se trata de un prototipo: solo se registra una solicitud en memoria.
    this.datos.solicitarReserva(this.destinoElegido, this.fecha, this.viajeros);
  }
}
