import {Role} from "./auth.enum";
import {jwtDecode as decode} from 'jwt-decode'
import {BehaviorSubject, catchError, filter, flatMap, map, Observable, tap, throwError} from "rxjs";
import {IUser, User} from "../user/user/user";
import {transformError} from "../common/common";
import {inject} from "@angular/core";
import {CacheService} from "../common/cache.service";

export abstract class AuthService implements IAuthService {

  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  protected readonly cache = inject(CacheService)

  constructor() {
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
    }
  }

  protected abstract authProvider(email: string, password: string): Observable<IServerAuthResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>

  login(email: string, password: string): Observable<void> {
    this.clearToken()
    const loginResponse$ = this.authProvider(email, password)
      .pipe(
        map((value) => {
          this.setToken(value.accessToken)
          return this.getAuthStatusFromToken()
        }),
        tap((status) => this.authStatus$.next(status)),
        filter((status: IAuthStatus) => status.isAuthenticated),
        flatMap(() => this.getCurrentUser()),
        map(user => this.currentUser$.next(user)),
        catchError(transformError)
      )
    loginResponse$.subscribe({
      error: err => {
        this.logout()
        return throwError(() => err)
      },
    })
    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus))
  }

  protected setToken(jwt: string) {
    this.cache.setItem('jwt', jwt)
  }

  getToken(): string {
    return this.cache.getItem('jwt') ?? ''
  }

  protected clearToken() {
    this.cache.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()
    if (jwt) {
      const payload = decode(jwt) as any
      return Date.now() > payload.exp * 1000
    }
    return true
  }

  protected getAuthStatusFromToken() : IAuthStatus {
    return this.transformJwtToken(decode(this.getToken()))
  }
}

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>

  login(email: string, password: string): Observable<void>

  logout(clearToken?: boolean): void

  getToken(): string
}
