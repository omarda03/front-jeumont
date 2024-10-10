import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface RouteData {
    roles?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    static canActivateLogin: any;

    constructor(
        private authService: AuthService, 
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            const routeData: RouteData = route.data as RouteData; 
            
            if (routeData && routeData.roles) {
                const userRole = this.authService.getUserRole();
            
                if (routeData.roles.includes(userRole)) {
                    return true;
                } else {
                    this.router.navigate(['/unauthorized']); 
                    return false;
                }
            }

            return true; 
        } else {

            this.router.navigate(['/login']);
            return false;
        }
    }

    canActivateLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            const userRole = this.authService.getUserRole();
        
            if (this.isValidClientRole(userRole)) {
                this.router.navigate(['/client']);
                return false;
            } else if (this.isValidAdminRole(userRole)) {
                this.router.navigate(['/']);
                return false;
            } else if (this.isValidRHRole(userRole)) {
                this.router.navigate(['/rh']);
                return false;
            } else {
                return false;
            }
            
        } else {
            return true;
        }
    }
    
    private isValidClientRole(role: number): boolean {
        const validRolesForClient: number[] = [10, 11, 12]; 
        return validRolesForClient.includes(role);
    }
    
    private isValidAdminRole(role: number): boolean {
        const validRolesForAdmin: number[] = [1, 2, 3, 4]; 
        return validRolesForAdmin.includes(role);
    }

    private isValidRHRole(role: number): boolean {
        const validRolesForAdmin: number[] = [5]; 
        return validRolesForAdmin.includes(role);
    }
}
