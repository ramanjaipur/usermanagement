import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';

import { RegistrationService } from '../registration.service';

import { Registration } from  '../registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
	  data: any = {};
    registerForm: FormGroup;
    submitted = false;
	loading = false;
	error: string;
	

    constructor( private formBuilder: FormBuilder, 
	         private registrationService: RegistrationService,
			 private router: Router)
			 {
				 }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
		// alert(JSON.stringify(this.data));
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) 
		{
            return;
        }
		  this.loading = true;
		   this.registrationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
     
					 this.router.navigate(['/login'], { queryParams: { registered: true }});
					
					  
                },
                error => {
						 console.log("error===",error);
						  this.error = 'Something missing wrong. Please try again';
						  this.loading = false;
                });
			/*this.registrationService.createUser(this.registerForm.value).subscribe((registration: Registration)=>{
        console.log("User created, ", registration);
      });
	  */
        console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    }
}
