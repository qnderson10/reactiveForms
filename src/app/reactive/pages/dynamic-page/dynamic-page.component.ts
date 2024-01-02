import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    favorites: this.formBuilder.array([
      ['Ninja Gaiden 3 Razor Edge', [Validators.required], []],
      ['Halo 2', [Validators.required], []],
    ]),
    add: ['', [], []],
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required], []);

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService){}

  get favorites(){
    return this.dynamicForm.get('favorites') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField( this.dynamicForm, field);
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }
  onAddToFavorite(): void{
    if (this.newFavorite.invalid) {
      return;
    }

    const newFavoriteValue = this.newFavorite.value;

    // this.favorites.push(new FormControl(newFavoriteValue, [Validators.required], []));
    this.favorites.push(
      this.formBuilder.control(newFavoriteValue, [Validators.required],[]),
    );

    this.newFavorite.reset();
  }
  onDeleteFavorite(index: number): void {
    this.favorites.removeAt(index);
  }
  onSubmit(): void {
    if(this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    (this.dynamicForm.controls['favorites'] as FormArray) = this.formBuilder.array([]);
    (this.dynamicForm.controls['favorites'] as FormArray) = this.formBuilder.array([]);
    this.dynamicForm.reset();
  }
}
