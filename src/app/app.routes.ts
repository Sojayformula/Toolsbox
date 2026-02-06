import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SigninComponent } from './signin/signin/signin.component';
import { Page1Component } from './pages/page1/page1.component'; 
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { UnitComponent } from './pages/unit/unit.component';
import { AddstaffComponent } from './pages/addstaff/addstaff.component';
import { OtpComponent } from './signin/otp/otp.component';
import { ForgotpasswordComponent } from './signin/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageslayoutComponent } from './pages/pageslayout/pageslayout.component';
import { CrmpagelayoutComponent } from './pages/CRMpages/crmpagelayout/crmpagelayout.component';
import { CRMDashboardComponent } from './pages/CRMpages/dashboard/dashboard.component';
import { ManageticketComponent } from './pages/CRMpages/manageticket/manageticket.component';
import { ResourceComponent } from './pages/CRMpages/resource/resourse/resource.component';
import { CRMToolsComponent } from './pages/CRMpages/crmtools/crmtools.component';
import { ToolsComponent } from './tools/tools.component';
import { AuthguardService } from '../service/authguard.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { ResorcepagelayoutComponent } from './pages/CRMpages/resource/resorcepagelayout/resorcepagelayout.component';
import { ContactimportComponent } from './pages/CRMpages/resource/contactimport/contactimport.component';
import { PermissionserviceService } from '../service/permissionservice.service';


export const routes: Routes = [

      // {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    {path: '', redirectTo:'home-page', pathMatch: 'full'},
    {path: 'home-page', component: HomePageComponent},
    {path: 'sign-in', component: SigninComponent},
    {path: 'otp', component: OtpComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},


    { path: '', component: PageslayoutComponent,
      canActivate: [AuthguardService, PermissionserviceService], data: { roles: ['CTO'] },
      children:[
    {path: '', redirectTo:'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'tools', component: ToolsComponent},
    {path: 'page1', component: Page1Component},
    {path: 'personal-information', component: PersonalInformationComponent},
    {path: 'unit', component: UnitComponent}, 
    {path: 'addstaff', component: AddstaffComponent},
    {path: 'profile', component: ProfileComponent},
     ]
    },
    


    { path: '', component: CrmpagelayoutComponent,
      canActivate: [AuthguardService],
      children:[
    {path: '', redirectTo:'home-page', pathMatch: 'full'},
    {path: 'crmdashboard', component: CRMDashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'manageticket', component: ManageticketComponent},
    {path: 'crmtools', component: CRMToolsComponent}, 

    { path: '', component: ResorcepagelayoutComponent,
      children:[
    {path: '', redirectTo: 'resource', pathMatch: 'full'},
    {path: 'resource', component: ResourceComponent},
    {path: 'contactimport', component: ContactimportComponent},

      ]
    },
  
  ]
    }
  

     


    //  {path: 'employee/:id/step/:step', component: PersonalInformationComponent},
    //  {path: 'employee/:id', redirectTo: 'employee/:id/step/1', pathMatch: 'full'}
    
];  

