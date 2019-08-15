import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RedirectComponent } from './redirect/redirect.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UrlComponent } from './url/url.component';
import { UserComponent } from './user/user.component';
import { UrlFormComponent } from './url-form/url-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RedirectComponent,
    MainComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    UrlComponent,
    UserComponent,
    UrlFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
