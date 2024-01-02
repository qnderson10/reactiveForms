import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl<string>('', [], []),
  //   price: new FormControl<number>(0, [], []),
  //   inStorage: new FormControl<number>(0, [], []),
  // });

  private tucua = {
    name: 'tucua',
    price: 1000,
    inStorage: 1,
  };

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService){}
  ngOnInit(): void {
    // this.myForm.reset(this.tucua);
  }


isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field);
  }

  getFieldError(field: string): string | null{

    if (!this.myForm.controls[field]) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';
        case 'minlength':
            return `Minimo ${errors['minlength'].requiredLength} caracteres.`;

        default:
          break;
      }
    }
    return null;
  }

  onSave(): void {
    if(this.myForm.invalid) {

      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({price: 0, inStorage: 0});
  }
}
