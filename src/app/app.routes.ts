import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { ProductionComponent } from './pages/production/production.component';
import { JobperformanceComponent } from './pages/jobperformance/jobperformance.component';
import { WorkhistoryComponent } from './pages/workhistory/workhistory.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Production2Component } from './pages/production2/production2.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';
import { ElementFormComponent } from './pages/element-form/element-form.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guards/login.guard';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { CustomerFormComponent } from './pages/customer-form/customer-form.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProfileEmployeeComponent } from './pages/profile-employee/profile-employee.component';
import { WorkbookEmployeeComponent } from './pages/workbook-employee/workbook-employee.component';
import { OrderTemplateComponent } from './pages/order-template/order-template.component';
import { FiredEmployeeComponent } from './pages/fired-employee/fired-employee.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    {
        path: '',
        component: SidebarComponent, // Este componente incluye <mat-sidenav-container> y <mat-sidenav>
        children: [
            { path: 'customerform', component: CustomerFormComponent },
            { path: 'employeeform', component: EmployeeFormComponent },
            { path: 'orderlist', component: OrderListComponent },
            { path: 'production', component: ProductionComponent },
            { path: 'jobperformance', component: JobperformanceComponent },
            { path: 'workhistory', component: WorkhistoryComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'production2', component: Production2Component },
            { path: 'orderform', component: OrderFormComponent },
            { path: 'elementform/:id/:customerid', component: ElementFormComponent },
            { path: 'employeeprofile', component: ProfileEmployeeComponent },
            { path: 'workbookemployee', component: WorkbookEmployeeComponent },
            { path: 'template', component: OrderTemplateComponent },
            { path: 'firedemployee', component: FiredEmployeeComponent },
        ], canActivate: [loginGuard]
    },
    { path: '**', redirectTo: '' }



];
