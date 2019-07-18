import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';

import { Dashboard } from  '../dashboard';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	  error: string;
    success: string;
	 //users: User[];
	 
	 	users: Dashboard[];
  constructor( private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute ) { 
    this.users = [];
  
  }

  ngOnInit() 
  {
	    // show success message on registration
        if (this.route.snapshot.queryParams['logged']=='true') 
		{
		// private products  = []; 
            this.success = 'successfully logged getting user list';
			  this.dashboardService.userlist().subscribe((users: Dashboard[])=>{
      this.users = users;
     // console.log(this.policies);
    });
			
			 /*this.dashboardService.userlist()
            .pipe(first())
            .subscribe(
                data => {
					//this.loading = false;
					console.log("data dashboard===",data);
					this.users =data ;
                },
                error => {
						  console.log("error===",error);
						  this.error = 'Something missing wrong. Please try again';
						 
                });*/
				
        } else 
		{
			this.error = 'Invalid Request';
		}
  }

}
