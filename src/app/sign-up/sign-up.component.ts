import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService, UserObject} from '../services/rest.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  // signUpForm: FormGroup;
  loading = false;
  submitted = false;
  //  setting the object interface to a variable
  public user: UserObject = {
    firstName: '',
   lastName: '',
    email: '',
    password: '',
};

  public value = '';
  constructor(private formBuilder: FormBuilder, private router: Router, public restService: RestService) { }
  ngOnInit() {
    console.log(this.user);
  }
// conected to the submit button and the form tag
  onSubmit() {
    console.log('am i here?');
    this.submitted = true;
    this.restService.addUser(this.user).subscribe(val =>  console.log(val));
    console.log(this.user);
  }
  }
