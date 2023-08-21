import { AuthenticationService } from './../../auth/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = this.auth.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return next.handle(request);
  }
}
