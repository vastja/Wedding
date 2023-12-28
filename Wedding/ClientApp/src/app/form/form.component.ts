import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';

type State = 'none' | 'pending' | 'success' | 'error';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {

  public guest = {
    firstName: "",
    lastName: "",
    email : "",
    plusOne: false,
    help: false
  }

  public state : State = 'none';

  private readonly _httpClient : HttpClient;

  public get firstName() : AbstractControl | null {
    return this.guestForm.get('firstName');
  }

  public get lastName() : AbstractControl | null {
    return this.guestForm.get('lastName');
  }

  public get email() : AbstractControl | null {
    return this.guestForm.get('email');
  }

  public get plusOne() : AbstractControl | null {
    return this.guestForm.get('plusOne');
  }

  public get help() : AbstractControl | null {
    return this.guestForm.get('help');
  }

  public guestForm! : FormGroup;

  public constructor(httpClient : HttpClient) {
    this._httpClient = httpClient;
  }

  public ngOnInit() {
    this.guestForm = new FormGroup({
      email: new FormControl(this.guest.email, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      firstName: new FormControl(this.guest.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.guest.lastName, [
        Validators.required
      ]),
      plusOne: new FormControl(this.guest.plusOne, []),
      help: new FormControl(this.guest.help, [])
    })
  }

  public onSubmit() : void {
    this.state = 'pending';
    this._httpClient.post(`api/guest`, this.guestForm.value)
    .subscribe({
      next: this._onSuccess.bind(this),
      error: this._onError.bind(this)
    });
  }

  private _onSuccess() {
    this.state = 'success';
  }

  private _onError(error : any) {
    this.state = 'error';
  }

  public isNotFilled() : boolean {
    return this.state === 'none';
  }

  public isPending() : boolean {
    return this.state === 'pending';
  }

  public isSuccess() : boolean {
    return this.state === 'success';
  }
}
