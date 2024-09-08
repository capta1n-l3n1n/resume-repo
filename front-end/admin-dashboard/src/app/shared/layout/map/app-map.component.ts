import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: 'app-map.component.html',
})
export class AppMapComponent implements OnChanges, AfterViewInit {
    @Input() lat: number | string;
    @Input() lng: number | string;
    @Input() id: string;

    private map: L.Map | null = null;
    private marker: L.Marker | null = null;
    ngAfterViewInit(): void {
        if (document.getElementById(this.id)) {
            this.initializeMap();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['lat'] || changes['lng']) {
            if (this.map) {
                // Map already initialized, update center and marker
                this.map.setView([Number(this.lat), Number(this.lng)]);
                if (this.marker) {
                    this.marker.setLatLng([Number(this.lat), Number(this.lng)]);
                } else {
                    this.addMarker();
                }
            } else {
                // Initialize the map for the first time
                this.initializeMap();
            }
        }
    }

    private initializeMap(): void {
        this.map = L.map(this.id, {
            center: [Number(this.lat), Number(this.lng)],
            zoom: 17,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            boxZoom: false,
            keyboard: false,
            zoomControl: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: '@xyz',
        }).addTo(this.map);

        this.addMarker();
    }

    private addMarker(): void {
        if (this.map) {
            const customIcon = L.icon({
                iconUrl: 'assets/layout/images/marker.png',
                iconSize: [25, 25],
                iconAnchor: [25, 25],
            });

            this.marker = L.marker([Number(this.lat), Number(this.lng)], {
                icon: customIcon,
            }).addTo(this.map);
        }
    }
}
