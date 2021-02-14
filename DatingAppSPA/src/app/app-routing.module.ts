import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MatchesListComponent } from './members/matches-list/matches-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
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
      { path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges] },
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
