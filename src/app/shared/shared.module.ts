// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserRolePipe } from './pipes/user-role.pipe';
import { HasRoleDirective } from './directives/has-role.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    CardComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    UserRolePipe,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    UserRolePipe,
    HasRoleDirective
  ]
})
export class SharedModule { }
