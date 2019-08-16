import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { RegisterComponent } from './register/register.component';
import { RedirectComponent } from './redirect/redirect.component';
import { MainComponent } from './main/main.component';
import { AccountGuard } from './account/account.guard';
import { UserService } from './user/user.service';
import { RegisterGuard } from './register/register.guard';


const routes: Routes = [
    {
        path: 'account',
        component: AccountComponent,
        data: { title: 'Account' },
        canActivate: [AccountGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login into your account' },
        canActivate: [LoginGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Create your account' },
        canActivate: [RegisterGuard]
    },
    {
        path: ':short',
        component: RedirectComponent,
    },
    {
        path: '',
        component: MainComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AccountGuard, LoginGuard, RegisterGuard, UserService]
})
export class AppRoutingModule { }
