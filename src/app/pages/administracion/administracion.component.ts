import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TravelDataService } from '../../services/travel-data.service';

@Component({ selector:'app-administracion', standalone:true, imports:[RouterLink], templateUrl:'./administracion.component.html' })
export class AdministracionComponent {
  constructor(public datos: TravelDataService) {}
  get pendientes(): number { return this.datos.reservas().filter(r => r.estado === 'Pendiente').length; }
}
