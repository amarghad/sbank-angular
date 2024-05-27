import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{


  constructor(private authService : AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let update : any = {}
    if (this.authService.isAuthenticated) {
      update.headers = req.headers.set("Authorization", `Bearer ${ this.authService.accessToken }`);
    }
    const clonedReq = req.clone(update);
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) this.authService.logout();
        return throwError(error);
      })
    );
  }

}
