import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import { AuthGuard } from './Services/sesion.guard'

import { LoginComponent, newUser } from './login/login.component';
import { StockComponent, newExpense } from './stock/stock.component';
import { DirectoriesComponent, newElement, confirmDeleteElement } from './directories/directories.component';
import { ModelComponent, newModel, confirmDeleteModel } from './model/model.component';
import { IncomeComponent, newIncome, confirmDeleteIncome } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { OfferComponent, newOffer, confirmDeleteOffer } from './offer/offer.component';



const appRoutes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalagos',
    component: DirectoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modelos',
    component: ModelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ingresos',
    component: IncomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'egresos',
    component: ExpenseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'oferta',
    component: OfferComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    newUser,
    StockComponent,
    DirectoriesComponent,
    newElement,
    confirmDeleteElement,
    ModelComponent,
    newModel,
    confirmDeleteModel,
    IncomeComponent,
    newIncome,
    confirmDeleteIncome,
    newExpense,
    ExpenseComponent,
    OfferComponent, 
    newOffer, 
    confirmDeleteOffer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    [RouterModule.forRoot(appRoutes)],
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    NgbModule
  ],
  entryComponents: [
    newUser,
    newElement,
    confirmDeleteElement,
    newModel,
    confirmDeleteModel,
    newIncome,
    confirmDeleteIncome,
    newExpense,
    newOffer, 
    confirmDeleteOffer
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
