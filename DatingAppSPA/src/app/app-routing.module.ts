import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:"always",
    canActivate:[AuthGuard],
    children:[
      {path:'matches',component:MatchesListComponent},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
    ]
  },
  //{path:'matches',component:MatchesListComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
