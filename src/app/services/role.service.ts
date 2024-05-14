import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // private role = new BehaviorSubject<string>('');

  constructor() { }
  router = inject(Router);

  // changeRole(newRole: string) {
  //   this.role.next(newRole);
  // }

  getRole():string {
    if(sessionStorage.getItem("role")){
      return sessionStorage.getItem("role")!;
    }else{
      return "";
    }
  }

  getUser():string {
    if(sessionStorage.getItem("user")){
      return sessionStorage.getItem("user")!;
    }else{
      return "";
    }
  }

  login(role: string, iduser:string) {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("user", iduser);
    sessionStorage.setItem("time", new Date().toString());
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
