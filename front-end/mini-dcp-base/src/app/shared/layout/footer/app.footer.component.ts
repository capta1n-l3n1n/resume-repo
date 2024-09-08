import { Component } from '@angular/core';
import { LayoutService } from '../app.layout.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
    date: any;
    constructor(public layoutService: LayoutService) {}
    ngOnInit(): void {
        this.date = Date.now();
    }
}
