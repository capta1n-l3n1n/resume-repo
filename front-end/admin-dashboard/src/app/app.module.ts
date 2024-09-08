import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './pages/components/notfound/notfound.component';
import { ProductService } from './pages/service/product.service';
import { CountryService } from './pages/service/country.service';
import { EventService } from './pages/service/event.service';
import { IconService } from './pages/service/icon.service';
import { NodeService } from './pages/service/node.service';
import { PhotoService } from './pages/service/photo.service';
import { AppLayoutModule } from './shared/layout/app.layout.module';
import { CampaignService } from './pages/service/campaign.service';
import { OrderHistoryService } from './pages/service/order-history.service';
import { InternalErrorComponent } from './pages/components/internal-error/internal-error.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { CustomerService } from './pages/service/customer.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const PRIMENG_GLOBAL_MODULES = [ToastModule];

@NgModule({
    declarations: [AppComponent, NotfoundComponent, InternalErrorComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        LeafletModule,
        ...PRIMENG_GLOBAL_MODULES,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerService,
            multi: true,
        },
        // {
        //     provide: LOCALE_ID,
        //     useValue: 'vi',
        // },
        {
            provide: DEFAULT_CURRENCY_CODE,
            useValue: 'VND',
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        CampaignService,
        OrderHistoryService,

        MessageService,
    ],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
