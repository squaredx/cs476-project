import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireauthService } from '../services/fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: FireauthService,
    private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const loggedIn = this.auth.isLoggedIn;

      if (!loggedIn) {
        // go to login page with the url 
        this.router.navigate(['/login'], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      }
      // check if the user is on the correct project page
      if (this.auth.userCompanyId !== route.paramMap.get('id')) {
        this.router.navigateByUrl('');
        return false;
      }
      return true;;
  }
}
