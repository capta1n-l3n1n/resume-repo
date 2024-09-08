import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './pages/components/notfound/notfound.component';
import { ProductService } from './pages/service/product.service';
import { CountryService } from './pages/service/country.service';
import { CustomerService } from './pages/service/customer.service';
import { EventService } from './pages/service/event.service';
import { IconService } from './pages/service/icon.service';
import { NodeService } from './pages/service/node.service';
import { PhotoService } from './pages/service/photo.service';
import { AppLayoutModule } from './shared/layout/app.layout.module';
import { CampaignService } from './pages/service/campaign.service';
import { CustomerRequestService } from './pages/service/customer-request.service';
import { CustomerProfileService } from './pages/service/customer-profile.service';
import { CustomerDetailService } from './pages/service/customer-detail.service';
import { OrderHistoryService } from './pages/service/order-history.service';
import { CustomerReviewService } from './pages/service/customer-review.service';
import { CustomerGroupService } from './pages/service/customer-group.service';
import { InternalErrorComponent } from './pages/components/internal-error/internal-error.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerService } from './shared/services/error-handler.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent, InternalErrorComponent],
    imports: [AppRoutingModule, AppLayoutModule, HttpClientModule],
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
        CustomerRequestService,
        CustomerProfileService,
        CustomerDetailService,
        OrderHistoryService,
        CustomerReviewService,
        CustomerGroupService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
