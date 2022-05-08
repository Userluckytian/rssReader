import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { zorroModule } from 'src/app/third_lib/Zorro/zorro_Modules';

@NgModule({
  imports: [
    ...zorroModule,
    SharedModule,
    LoginRoutes,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [LoginComponent],
  providers: [FormBuilder]
})
export class LoginModule { }
