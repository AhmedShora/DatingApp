import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MatchesListComponent } from './members/matches-list/matches-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: 'matches', component: MatchesListComponent, resolve: { allUsers: MemberListResolver } },
      { path: 'matches/:id', component: MemberDetailsComponent, resolve: { user: MemberDetailsResolver } },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  },
  //{path:'matches',component:MatchesListComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
