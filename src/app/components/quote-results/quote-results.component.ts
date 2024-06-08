import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-results',
  templateUrl: './quote-results.component.html',
  styleUrls: ['./quote-results.component.scss']
})
export class QuoteResultsComponent {

  constructor(private router: Router) { }

  acceptQuote(): void {
    // Lógica para aceptar la cotización y pasar al siguiente caso de uso
    this.router.navigate(['/asignar-grua']);
  }

  rejectQuote(): void {
    // Lógica para rechazar la cotización y finalizar el caso de uso
    this.router.navigate(['/']);
  }
}
