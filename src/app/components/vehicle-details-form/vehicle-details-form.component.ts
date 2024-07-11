import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MapDirectionsService,
  MapDirectionsResponse,
} from '@angular/google-maps';

interface RouteSegment {
  segment: string;
  km: number;
}

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
  routeDataSource: RouteSegment[] = [];
  routeDisplayedColumns: string[] = ['segment', 'km'];
  totalKm = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapDirectionsService: MapDirectionsService
  ) {
    const today = new Date();
    this.vehicleForm = this.fb.group({
        clientType: ['', Validators.required],
        serviceType: ['', Validators.required],
        client: ['', Validators.required],
        billOfLading: ['', Validators.required],
        includeBaseToOrigin: [false],
        includeOriginToBase: [false],
        origin: ['', Validators.required],
        destination: ['', Validators.required],
        vehicleMake: ['', Validators.required],
        vehicleModel: ['', Validators.required],
        vehicleYear: ['', Validators.required],
        vehicleLicensePlate: ['', Validators.required],
        vehicleColor: ['', Validators.required],
        clientName: ['', Validators.required],
        clientPhone: ['', Validators.required],
        flagRate: ['', Validators.required],
        kmRate: ['', Validators.required],
        tolls: ['', Validators.required],
        fuelLiters: [''],
        companyExcess: [false],
        maneuverExcess: [''],
        sectionExcess: [''],
        clientTolls: ['', Validators.required],
        invoiceNumber: ['', Validators.required],
        excessHolder: [false],
        holderManeuverExcess: [''],
        holderSectionExcess: [''],
        operator: ['', Validators.required],
        crane: ['', Validators.required],
        reportNumber: ['', Validators.required],
        observations: ['']
    });
  }

  ngOnInit(): void {}

  toggleExcedenteCompania() {
    this.showExcedenteCompania = !this.showExcedenteCompania;
  }

  toggleExcedenteTitular() {
    this.showExcedenteTitular = !this.showExcedenteTitular;
  }


  calculateRoute(): void {
    // Lógica de cálculo de ruta simulada
    this.routeDataSource = [
      { segment: 'Base a Origen', km: 20 },
      { segment: 'Origen a Destino', km: 60 },
      { segment: 'Destino a Base', km: 20 }
    ];
    this.totalKm = this.routeDataSource.reduce((acc, curr) => acc + curr.km, 0);
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
      this.calculateRoute();
    }
  }

  onCancel(): void {
    this.router.navigate(['/cotizar']);
  }
}
