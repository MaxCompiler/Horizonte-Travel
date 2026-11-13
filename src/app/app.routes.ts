import { Routes } from '@angular/router';
import { authGuard, invitadoGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { SoporteComponent } from './pages/soporte/soporte.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [invitadoGuard], title: 'Iniciar sesión | Horizonte Travel' },
  { path: 'registro', component: RegistroComponent, canActivate: [invitadoGuard], title: 'Registrarse | Horizonte Travel' },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard], title: 'Inicio | Horizonte Travel' },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard], title: 'Catálogo | Horizonte Travel' },
  { path: 'reservas', component: ReservasComponent, canActivate: [authGuard], title: 'Reservas | Horizonte Travel' },
  { path: 'pagos', component: PagosComponent, canActivate: [authGuard], title: 'Pagos | Horizonte Travel' },
  { path: 'administracion', component: AdministracionComponent, canActivate: [authGuard], title: 'Administración | Horizonte Travel' },
  { path: 'soporte', component: SoporteComponent, canActivate: [authGuard], title: 'Soporte | Horizonte Travel' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];
