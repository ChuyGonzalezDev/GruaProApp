import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteServiceComponent } from './pages/quote-service/quote-service.component';
import { VehicleDetailsFormComponent } from './components/vehicle-details-form/vehicle-details-form.component';
import { QuoteResultsComponent } from './components/quote-results/quote-results.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cotizar', component: QuoteServiceComponent, canActivate: [AuthGuard] },
  { path: 'detalles-vehiculo', component: VehicleDetailsFormComponent, canActivate: [AuthGuard] },
  { path: 'resultados-cotizacion', component: QuoteResultsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
