import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Import desired component (for routing)
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    }, {
        // We add the "name" parameter
        path: 'detail/:name', component: AccountDetailComponent
    }, //The ** path in the last route is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the configuration. This is useful for displaying a "404 - Not Found" page or redirecting to another route.
    { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}