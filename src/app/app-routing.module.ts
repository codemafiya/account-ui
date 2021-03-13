import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './/layouts/layout.component';
import { SigninComponent } from './signin/signin.component';


import { DashboardComponent } from './dashboard/dashboard.component';

import { SignupComponent } from './signup/signup.component';

import { OverviewComponent } from './overview/overview.component';




//
import { ReportComponent } from './report/report.component';
import { TblComponent } from './report/tbl/tbl.component';
import { LrComponent } from './report/lr/lr.component';
import { CwrComponent } from './report/cwr/cwr.component';
import { PwrComponent } from './report/pwr/pwr.component';
import { GstReportComponent } from './report/gst-report/gst-report.component';
import { JeComponent } from './je/je.component';
import { ContraComponent } from './je/contra/contra.component';
import { GeComponent } from './je/ge/ge.component';
import { ApComponent } from './ap/ap.component';
import { BillComponent } from './ap/bill/bill.component';
import { BpComponent } from './ap/bp/bp.component';
import { ArComponent } from './ar/ar.component';
import { ChallanComponent } from './ar/challan/challan.component';
import { DemandComponent } from './ar/demand/demand.component';
import { BudComponent } from './bud/bud.component';
import { CreationComponent } from './bud/creation/creation.component';
import { AllocationComponent } from './bud/allocation/allocation.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { GstComponent } from './master-data/gst/gst.component';
import { DedComponent } from './master-data/ded/ded.component';
import { EventComponent } from './master-data/event/event.component';
import { AllowancesComponent } from './master-data/allowances/allowances.component';
import { ProductsComponent } from './master-data/products/products.component';
import { PartyComponent } from './party/party.component';
import { ChartOfAccountComponent } from './master-data/chart-of-account/chart-of-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    "path": "",
    "component": LayoutComponent,
    "children": [
      { path: '', component: DashboardComponent },
      { path: 'index', component: DashboardComponent },
      { path: 'party', component: PartyComponent },
     
      
      {
        path: 'report', component: ReportComponent,
        children: [
          { path: 'tbl', component: TblComponent },
          { path: 'lr', component: LrComponent },
          { path: 'cwr', component: CwrComponent },
          { path: 'pwr', component: PwrComponent },
          { path: 'gst', component: GstReportComponent },

        ]
      },
      {
        path: 'master-data', component: MasterDataComponent,
        children: [
          { path: 'event', component: EventComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'allowances', component: AllowancesComponent },
          { path: 'ded', component: DedComponent },
          { path: 'gst', component: GstComponent },
          { path: 'chartofaccount', component: ChartOfAccountComponent },
         

        ]
      },
      {
        path: 'ap', component: ApComponent,
        children: [
          { path: 'bill', component: BillComponent },
          { path: 'bp', component: BpComponent },
          
         

        ]
      },
      {
        path: 'entry', component: JeComponent,
        children: [
          { path: 'ge', component: GeComponent },
          { path: 'contra', component: ContraComponent },
          
         

        ]
      },
    ]
  },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'overview', component: OverviewComponent },
  {
    "path": "**",
    "redirectTo": "login",
    "pathMatch": "full"
  },




];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
