import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit{

  public switchesForm: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required], []],
    wantNotifications: [true, [Validators.required], []],
    termsAndConditions: [false, [Validators.requiredTrue], []],
  })

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService){}
  ngOnInit(): void {
    this.switchesForm.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField( this.switchesForm, field);
  }

  //ngSubmit
  onSave(): void {
    if (this.switchesForm.invalid) {
      this.switchesForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.switchesForm.value
    this.person = newPerson;
    console.log(this.switchesForm.value);
    console.log(this.person);

  }
}
