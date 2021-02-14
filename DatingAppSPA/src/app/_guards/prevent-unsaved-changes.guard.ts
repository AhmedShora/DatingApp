import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { MemberEditResolver } from '../_resolvers/member-edit.resolver';



@Injectable({providedIn: 'root'})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent){
        if(component.editForm.dirty){
            return confirm("Are you sure? any changes will be lost!");
        }
        return true;
    }
}