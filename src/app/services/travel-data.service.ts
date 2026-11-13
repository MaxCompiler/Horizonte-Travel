import { Injectable, signal } from '@angular/core';

export interface Destino {
  id: number;
  nombre: string;
  provincia: string;
  tipo: string;
  precio: number;
  emoji: string;
  fondo: string;
  descripcion: string;
}

export interface Reserva {
  codigo: string;
  destino: string;
  fecha: string;
  viajeros: number;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class TravelDataService {
  public destinos: Destino[] = [
    { id: 1, nombre: 'Islas Galápagos', provincia: 'Galápagos', tipo: 'Naturaleza', precio: 790, emoji: '🐢', fondo: 'oceano', descripcion: 'Fauna única, excursiones y naturaleza extraordinaria.' },
    { id: 2, nombre: 'Baños de Agua Santa', provincia: 'Tungurahua', tipo: 'Aventura', precio: 145, emoji: '⛰️', fondo: 'montana', descripcion: 'Cascadas, actividades de aventura y paisajes andinos.' },
    { id: 3, nombre: 'Cuenca colonial', provincia: 'Azuay', tipo: 'Cultura', precio: 120, emoji: '🏛️', fondo: 'ciudad', descripcion: 'Historia, arquitectura y gastronomía tradicional.' },
    { id: 4, nombre: 'Montañita', provincia: 'Santa Elena', tipo: 'Playa', precio: 110, emoji: '🏖️', fondo: 'playa', descripcion: 'Sol, surf y experiencias en la costa ecuatoriana.' },
    { id: 5, nombre: 'Amazonía ecuatoriana', provincia: 'Napo', tipo: 'Naturaleza', precio: 320, emoji: '🌿', fondo: 'selva', descripcion: 'Selva tropical, biodiversidad y turismo comunitario.' },
    { id: 6, nombre: 'Quilotoa', provincia: 'Cotopaxi', tipo: 'Aventura', precio: 95, emoji: '🌋', fondo: 'laguna', descripcion: 'Senderismo y vistas a la laguna volcánica.' }
  ];

  public reservas = signal<Reserva[]>([
    { codigo: 'HT-2026-001', destino: 'Islas Galápagos', fecha: '2026-12-08', viajeros: 2, estado: 'Confirmada' },
    { codigo: 'HT-2026-002', destino: 'Cuenca colonial', fecha: '2026-12-14', viajeros: 1, estado: 'Pendiente' },
    { codigo: 'HT-2026-003', destino: 'Baños de Agua Santa', fecha: '2027-01-17', viajeros: 3, estado: 'Confirmada' }
  ]);

  public avisoReserva = signal<string>('');

  public solicitarReserva(destino: string, fecha: string, viajeros: number): void {
    const secuencia = this.reservas().length + 1;
    const codigo = `HT-2026-${String(secuencia).padStart(3, '0')}`;
    this.reservas.update(actuales => [...actuales, { codigo, destino, fecha, viajeros, estado: 'Pendiente' }]);
    this.avisoReserva.set(`Solicitud ${codigo} registrada para ${destino} (demostración).`);
  }
}
