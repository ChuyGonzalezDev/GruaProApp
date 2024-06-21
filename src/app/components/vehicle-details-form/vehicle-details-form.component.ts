import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MapDirectionsService,
  MapDirectionsResponse,
} from '@angular/google-maps';

@Component({
  selector: 'app-vehicle-details-form',
  templateUrl: './vehicle-details-form.component.html',
  styleUrls: ['./vehicle-details-form.component.scss'],
})
export class VehicleDetailsFormComponent implements OnInit {
  vehicleForm: FormGroup;
  showExcedenteCompania = false;
  showExcedenteTitular = false;
  center: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 }; // Centro del mapa (CDMX)
  zoom = 10;
  origin: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 };
  destination: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 };
  directions: google.maps.DirectionsResult | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapDirectionsService: MapDirectionsService
  ) {
    const today = new Date();
    this.vehicleForm = this.fb.group({
      fechaServicio: [today, Validators.required],
      numeroCotizacion: [
        { value: this.generateNumeroCotizacion(), disabled: true },
        Validators.required,
      ],
      cabina: ['', Validators.required],
      nombreOperador: ['', Validators.required],
      tipoServicio: ['', Validators.required],
      folioCartaPorte: [''],
      baseOrigen: [false],
      baseDestino: [false],
      costoKm: ['', Validators.required],
      banderazo: ['', Validators.required],
      casetas: ['', Validators.required],
      casetasSinIva: ['', Validators.required],
      gasolina: ['', Validators.required],
      gasolinaSinIva: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      telefono: ['', Validators.required],
      seguro: ['', Validators.required],
      numeroReporte: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      matricula: ['', Validators.required],
      color: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      kilometrosTotales: [{ value: 0, disabled: true }, Validators.required],
      excedenteManiobra: [''],
      excedenteTramo: [''],
      pagoExcedentesTitular: [''],
      kmTitular: [''],
      costoKmTitular: [''],
      casetasTitular: [''],
      tuvoExcedentes: [false],
      excedenteCompania: [false],
      excedenteManiobraCompania: [''],
      excedenteTramoCompania: [''],
      excedenteTitular: [false],
      excedenteTitularField: [''],
      banderazoTitular: ['', Validators.required],
      casetasSinIvaTitular: ['', Validators.required],
      gasolinaTitular: ['', Validators.required],
      gasolinaSinIvaTitular: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  generateNumeroCotizacion(): number {
    return Math.floor(Math.random() * 100000) + 1;
  }

  toggleExcedenteCompania() {
    this.showExcedenteCompania = !this.showExcedenteCompania;
  }

  toggleExcedenteTitular() {
    this.showExcedenteTitular = !this.showExcedenteTitular;
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
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.mapDirectionsService.route(request).subscribe((response) => {
      if (response.result) {
        this.directions = response.result;
        this.origin = {
          lat: response.result.routes[0].legs[0].start_location.lat(),
          lng: response.result.routes[0].legs[0].start_location.lng(),
        };
        this.destination = {
          lat: response.result.routes[0].legs[0].end_location.lat(),
          lng: response.result.routes[0].legs[0].end_location.lng(),
        };
        this.center = {
          lat: (this.origin.lat + this.destination.lat) / 2,
          lng: (this.origin.lng + this.destination.lng) / 2,
        };
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/cotizar']);
  }
}
