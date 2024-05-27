import {ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HasRolesGuard implements CanActivate {

  constructor(private authService : AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let requiredRoles : string[] = route.data['roles'];
    for (let role of requiredRoles) {
      if (this.authService.roles.includes(role)) {
        return true;
      }
    }

    return false;
  }

}
