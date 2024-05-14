import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavContainer, MatSidenav, MatToolbar, MatNavList, MatListItem, MatIcon, MatSidenavContent, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  role:string = "";

  constructor(private roleService: RoleService) {
    this.role = this.roleService.getRole();  
   }
  

  logout() {
    this.roleService.logout();
  }

}
