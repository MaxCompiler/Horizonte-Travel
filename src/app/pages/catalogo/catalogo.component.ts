import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TravelDataService } from '../../services/travel-data.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  busqueda = '';
  categoria = 'Todos';
  constructor(public datos: TravelDataService, private router: Router) {}

  get destinosFiltrados() {
    const termino = this.busqueda.trim().toLowerCase();
    return this.datos.destinos.filter(d =>
      (this.categoria === 'Todos' || d.tipo === this.categoria) &&
      (!termino || `${d.nombre} ${d.provincia}`.toLowerCase().includes(termino))
    );
  }

  irAReservar(destino: string): void {
    this.router.navigate(['/reservas'], { queryParams: { destino } });
  }
}
