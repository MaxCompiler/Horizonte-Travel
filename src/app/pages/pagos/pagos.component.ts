import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector:'app-pagos', standalone:true, imports:[RouterLink], templateUrl:'./pagos.component.html' })
export class PagosComponent {
  comprobante = '';
  documentos = [
    { codigo:'FAC-1001', concepto:'Paquete Galápagos', fecha:'2026-11-04', total:1580, estado:'Pagado' },
    { codigo:'FAC-1002', concepto:'Paquete Cuenca', fecha:'2026-11-06', total:120, estado:'Pendiente' },
    { codigo:'FAC-1003', concepto:'Excursión Baños', fecha:'2026-11-08', total:435, estado:'Pagado' }
  ];
  consultar(codigo: string): void { this.comprobante = `Comprobante ${codigo}: vista previa informativa. No se genera ninguna factura real.`; }
}
