import { CredentialsService } from '@app/auth';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
  userId: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) { }
  userIdData!: any;

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(credentials: LoginContext): Observable<any> {
    const data = {
      email: credentials.username,
      password: credentials.password,
    };
    console.log(data);

    return this.http
      .post(`${environment.apiURL}/v1/auth/login`, data, { observe: 'response' })
      .pipe(map(authenticateSuccess.bind(this)));

    async function authenticateSuccess(this: any, resp: any) {
      console.log(resp.body);
      const response = {
        username: resp.body.user.email,
        token: resp.body.tokens.access.token || null,
        userId: resp.body.user.id
      };
      console.log(response);
      this.userIdData = response;
      this.getUserId()
      await this.credentialsService.setCredentials(response);
    }
  }

  /**
   * gets credential keys
   * @return only the token string
   */
  getToken() {
    const idToken = this.credentialsService.credentials;
    if (idToken) {
      return idToken.token;
    } else {
      return '{}';
    }
  }

  // criei para botar no credentials service o id do usuário no backend pra ser usado no like system;
  getUserId() {
    const idToken = this.credentialsService.credentials;
    if (idToken) {
      return idToken.userId;
    } else {
      return '{}';
    }
  }


  //this.credentialsService.setCredentials(data, context.remember);
  //return of(data);

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
