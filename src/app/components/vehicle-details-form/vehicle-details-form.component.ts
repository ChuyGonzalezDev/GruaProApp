import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MapDirectionsService, MapDirectionsResponse } from '@angular/google-maps';

@Component({
  selector: 'app-vehicle-details-form',
  templateUrl: './vehicle-details-form.component.html',
  styleUrls: ['./vehicle-details-form.component.scss']
})
export class VehicleDetailsFormComponent implements OnInit {
  vehicleForm: FormGroup;
  showExcedentes: boolean = false;
  showManiobras: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 }; // Centro del mapa (CDMX)
  zoom = 10;
  origin: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 };
  destination: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 };
  directions: google.maps.DirectionsResult | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapDirectionsService: MapDirectionsService
  ) {
    this.vehicleForm = this.fb.group({
      numeroCotizacion: [{ value: this.generateNumeroCotizacion(), disabled: true }, Validators.required],
      cabina: ['', Validators.required],
      nombreOperador: ['', Validators.required],
      tipoServicio: ['', Validators.required],
      costoKm: ['', Validators.required],
      banderazo: ['', Validators.required],
      casetas: ['', Validators.required],
      casetasSinIva: ['', Validators.required],
      gasolina: ['', Validators.required],
      gasolinaSinIva: ['', Validators.required],
      tuvoExcedentes: [false],
      tuvoManiobras: [false],
      excedenteManiobra: [''],
      excedenteTramo: [''],
      pagoExcedentesTitular: [''],
      kmTitular: [''],
      costoKmTitular: [''],
      casetasTitular: [''],
      nombreCliente: ['', Validators.required],
      telefono: ['', Validators.required],
      seguro: ['', Validators.required],
      numeroReporte: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', Validators.required],
      placa: ['', Validators.required],
      tipoGrua: ['', Validators.required],
      direccionOrigen: ['', Validators.required],
      ciudadOrigen: ['', Validators.required],
      estadoOrigen: ['', Validators.required],
      codigoPostalOrigen: ['', Validators.required],
      direccionDestino: ['', Validators.required],
      ciudadDestino: ['', Validators.required],
      estadoDestino: ['', Validators.required],
      codigoPostalDestino: ['', Validators.required],
      fechaManiobra: ['', Validators.required],
      horaManiobra: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  generateNumeroCotizacion(): number {
    return Math.floor(Math.random() * 100000) + 1;
  }

  toggleExcedentes(): void {
    this.showExcedentes = this.vehicleForm.get('tuvoExcedentes')?.value;
  }
  toggleManiobras(): void {
    this.showManiobras = this.vehicleForm.get('tuvoManiobras')?.value;
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
      this.calculateRoute();
    }
  }

  calculateRoute(): void {
    const originAddress = this.vehicleForm.get('direccionOrigen')?.value;
    const destinationAddress = this.vehicleForm.get('direccionDestino')?.value;

    const request: google.maps.DirectionsRequest = {
      origin: originAddress,
      destination: destinationAddress,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.mapDirectionsService.route(request).subscribe(response => {
      if (response.result) {
        this.directions = response.result;
        this.origin = {
          lat: response.result.routes[0].legs[0].start_location.lat(),
          lng: response.result.routes[0].legs[0].start_location.lng()
        };
        this.destination = {
          lat: response.result.routes[0].legs[0].end_location.lat(),
          lng: response.result.routes[0].legs[0].end_location.lng()
        };
        this.center = {
          lat: (this.origin.lat + this.destination.lat) / 2,
          lng: (this.origin.lng + this.destination.lng) / 2
        };
      }
    });
  }
}
