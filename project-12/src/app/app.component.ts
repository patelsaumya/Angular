import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Deven'];
  user = {
    username: '',
    email: '',
    gender: '',
    hobbies: []
  };
  submitted = false


  ngOnInit(): void {
    // called before the template is rendered.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   value => console.log(value)
    // );

    // this.signupForm.statusChanges.subscribe(
    //   status => console.log(status)
    // );

    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Red',
    //     'email': 'red@test.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // });

    this.signupForm.patchValue({
      'userData': {
        'username': 'Liz'
      }
    })
  }

  onSubmit() {
    // console.log(this.signupForm);
    this.submitted = true;
    this.user.username =this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.gender = this.signupForm.value.gender;
    this.user.hobbies = this.signupForm.value.hobbies;

    // this.signupForm.reset();
    this.signupForm.reset({
      'gender': 'female'
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  // Custom Sync Validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameIsForbidden': true
      };
      // 'nameIsForbidden' is a error code
    }
    return null; // if validation is successful then pass 'null' or don't pass anything.
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({
            'emailIsForbidden': true
          });
        } else {
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
