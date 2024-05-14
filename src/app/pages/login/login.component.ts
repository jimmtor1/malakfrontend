import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { LoginDTO } from '../../model/login-dto';
import { BdQuerysService } from '../../services/bd-querys.service';
import { RoleService } from '../../services/role.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatGridList, MatGridTile, MatFormField, MatLabel, FormsModule, MatOption, MatSelect, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
    this.error = false;
  }

  error = false;

  constructor(private dbservice : BdQuerysService, private roleService:RoleService, private router:Router){

  }

  loginDTO:LoginDTO={
    role:"",
    user:"",
    pass:""
  }

  role = "";

  login(){
    this.dbservice.postLogin(this.loginDTO).subscribe(l=>{
      if(l){
        this.roleService.login(this.loginDTO.role,l.toString());
        this.router.navigate([''])
      }else{
        this.error = true;
      }
    });
  }  


}
