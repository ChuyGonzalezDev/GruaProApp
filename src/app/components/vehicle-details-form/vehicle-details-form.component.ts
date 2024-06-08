import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-details-form',
  templateUrl: './vehicle-details-form.component.html',
  styleUrls: ['./vehicle-details-form.component.scss']
})
export class VehicleDetailsFormComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      direccionOrigen: ['', Validators.required],
      ciudadOrigen: ['', Validators.required],
      estadoOrigen: ['', Validators.required],
      codigoPostalOrigen: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      ciudadDestino: ['', Validators.required],
      estadoDestino: ['', Validators.required],
      codigoPostalDestino: ['', Validators.required],
      tipoServicio: ['', Validators.required],
      fecha: ['', Validators.required],
      seguro: ['', Validators.required],
      km: ['', Validators.required],
      costoKm: ['', Validators.required],
      montoKm: ['', Validators.required],
      banderazo: ['', Validators.required],
      casetas: ['', Validators.required],
      gasolina: ['', Validators.required],
      excedenteManiobra: ['', Validators.required],
      excedenteTramo: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      // Aquí se llamaría al servicio que calcula la cotización
      this.router.navigate(['/resultados-cotizacion']);
    }
  }
}
