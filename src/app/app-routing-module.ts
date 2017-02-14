import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Import desired component (for routing)
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailComponent } from './account-detail/account-detail.component'
const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    }, {
        path: 'detail', component: AccountDetailComponent 
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}