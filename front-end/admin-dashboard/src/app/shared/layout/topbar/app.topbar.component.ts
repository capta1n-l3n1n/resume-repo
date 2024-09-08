import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    constructor(public layoutService: LayoutService) { }

    get logoContainerClass() {
        return this.layoutService.state.staticMenuDesktopInactive
            ? 'inactive'
            : 'block';
    }

    get menuContainerClass() {
        return this.layoutService.state.staticMenuDesktopInactive
            ? 'inactive'
            : 'block';
    }
    get pageTitle() {
        return this.layoutService.state.pageTitle
    }
}
