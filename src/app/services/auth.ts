import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DataService } from './servis.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public servis: DataService,
        public router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        var yetkiler = route.data["yetkiler"] as Array<string>;

        if (!this.servis.OturumKontrol()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        var sonuc: boolean = false;
        if (yetkiler) {
            sonuc = this.servis.YetkiKontrol(yetkiler);
        }
        if (!sonuc) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        return sonuc;
    }
}