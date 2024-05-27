import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly accessTokenLocalStorageNameProperty = "accessToken";

  private _accessToken! : string | null;
  private _isAuthenticated! : boolean;
  private _roles! : string[];
  private _username! : string;

  constructor(private http : HttpClient) {
    this._isAuthenticated = false
  }

  attempt(username: string, password : string) {
    return this.http.post<any>(`${environment.repository}/auth/login`, { username, password });
  }

  login(accessToken : any) {
    this._accessToken = accessToken
    this._isAuthenticated = true
    // @ts-ignore
    let jwt : any = jwtDecode(this._accessToken);
    // @ts-ignore
    window.localStorage.setItem(AuthService.accessTokenLocalStorageNameProperty, this._accessToken);
    this._roles = jwt.scope.split("|");
    this._username = jwt.iss;
  }

  logout() {
    this._isAuthenticated = false;
    this._accessToken = null;
    window.localStorage.removeItem(AuthService.accessTokenLocalStorageNameProperty);
  }

  changePassword(oldPassword : string, newPassword : string) {
    return this.http.put(`${environment.repository}/auth/changePassword`, {
      oldPassword, newPassword
    })
  }

  loadAccessTokenFromLocalStorage() {
    let token : string | null = window.localStorage.getItem(AuthService.accessTokenLocalStorageNameProperty);
    if (token != null) {
      this.login(token);
    }
  }


  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }


  get accessToken(): string | null {
    return this._accessToken;
  }

  get username(): string {
    return this._username;
  }

  get roles(): string[] {
    return this._roles;
  }
}
