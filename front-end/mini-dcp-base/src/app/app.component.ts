import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig) {
        // private translateService: TranslateService
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        // this.translateService.setDefaultLang('en');
        // this.primengConfig.setTranslation({
        //     accept: 'Accept',
        //     reject: 'Cancel',
        //     //translations
        // });
    }
    // translate(lang: string) {
    //     this.translateService.use(lang);
    //     this.translateService
    //         .get('primeng')
    //         .subscribe((res) => this.primengConfig.setTranslation(res));
    // }
}
