import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public guest = {
    email : ""
  }

  public get email() : AbstractControl | null {
    return this.guestForm.get('email');
  }

  public guestForm : FormGroup;

  public constructor() {
    this.guestForm = new FormGroup({
      email: new FormControl(this.guest.email, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ])
    })
  }

  public onSubmit() : void {
    console.log(this.guestForm);
    console.log(this.email);
  }
}
