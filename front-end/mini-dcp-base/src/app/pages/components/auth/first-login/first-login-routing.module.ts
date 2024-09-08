import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirstLoginComponent } from './first-login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: FirstLoginComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class FirstLoginRoutingModule {}
