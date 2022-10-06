import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData: User;

  constructor(private profilesService: ProfileService) { 
    this.profileData={} as User;
  }

  ngOnInit(): void {
    this.getEspecificUser();
  }

/*
  getAllStudents(){
    this.profilesService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    });
  }
*/

  getOneUser(){
    this.profilesService.getById(1).subscribe((response: any)=>{
      /*this.profileData.first_name = response.first_name;*/
      this.profileData = response;
    });
  }

  getEspecificUser(){
    this.profilesService.getById(1).subscribe((response: any)=>{
      /*this.profileData.first_name = response.first_name;*/
      this.profileData = response;
    });
  }


}
