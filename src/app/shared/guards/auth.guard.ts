import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private fb: FirebaseService,
    private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const loggedIn = this.fb.isLoggedIn;

      if(!loggedIn) {
        //go to login page with the url 
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      }
      //check if the user is on the correct project page
      if(this.fb.userCompanyId !== route.paramMap.get('id')) {
        this.router.navigateByUrl('');
        return false;
      }
    
      return true;;
  }
  
}
