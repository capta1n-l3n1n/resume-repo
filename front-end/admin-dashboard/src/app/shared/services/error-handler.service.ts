import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (
                    error.status == 500 ||
                    error.status == 502 ||
                    error.status == 1
                ) {
                    // Redirect to the internal error page
                    this.router.navigate(['/internal-error']);
                }
                return throwError(error);
            }),
        );
    }
}
