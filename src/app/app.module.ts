import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './/app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LayoutModule } from './/layouts/layout.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileUploadModule } from 'ng2-file-upload';
import {MatStepperModule} from '@angular/material/stepper';

import { NgSelectModule } from '@ng-select/ng-select';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';//social media login
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';


import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ChartsModule, ThemeService } from 'ng2-charts';
//all Component


import { SignupComponent } from './signup/signup.component';

import { OverviewComponent } from './overview/overview.component';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardComponent } from './dashboard/dashboard.component';

import {Canvas} from 'canvasjs';

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

export function socialConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('310166580213096')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('871836852298-1p3fsnis2pscv456fk9894ci62i68ocq.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    
    AppComponent,
    SigninComponent,
  
    SignupComponent,
  
    OverviewComponent,
    PartyComponent,
    ReportComponent,
    TblComponent,
    LrComponent,
    CwrComponent,
    PwrComponent,
    GstReportComponent,
    JeComponent,
    ContraComponent,
    GeComponent,
    ApComponent,
    DashboardComponent,
    BillComponent,
    BpComponent,
    ArComponent,
    ChallanComponent,
    DemandComponent,
    BudComponent,
    CreationComponent,
    AllocationComponent,
    MasterDataComponent,
    GstComponent,
    DedComponent,
    EventComponent,
    AllowancesComponent,
    ProductsComponent,
    ChartOfAccountComponent,
  ],
  imports: [
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    MatMenuModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    CdkStepperModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    Ng2SmartTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    FileUploadModule,
    NgSelectModule,
    DragDropModule,
    NgbModule
  ],
  providers: [ScriptLoaderService,ThemeService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
