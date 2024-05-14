import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const role = sessionStorage.getItem("role");
  const router = inject(Router);

  if(role){
    if(state.url == "/production"){
      if(role=="customer"){
        return false;
      }
    }else if(state.url == "/orderlist"){
      if(role=="employee"){
        return false;
      }
    }    
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};


