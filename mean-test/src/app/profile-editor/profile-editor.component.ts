import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})

export class ProfileEditorComponent {

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  getStateByZip(zip: string) {
    const stateByZipMap: { [key: string]: string } = {
      '30144': 'Georgia',
      '30152': 'Georgia',
      '30060': 'Georgia',
      '30061': 'Georgia',
      '30062': 'Georgia',
      '30063': 'Georgia',
      '30064': 'Georgia',
      '30065': 'Georgia',
      '30066': 'Georgia',
      '30067': 'Georgia',
      '30068': 'Georgia',
      '30069': 'Georgia',
      '30188': 'Georgia',
      '30189': 'Georgia',
    };

    return stateByZipMap[zip] || '';
  }

  getCityByZip(zip: string) {
    const cityByZipMap: { [key: string]: string } = {
      '30144': 'Kennesaw',
      '30152': 'Kennesaw',
      '30060': 'Marietta',
      '30061': 'Marietta',
      '30062': 'Marietta',
      '30063': 'Marietta',
      '30064': 'Marietta',
      '30065': 'Marietta',
      '30066': 'Marietta',
      '30067': 'Marietta',
      '30068': 'Marietta',
      '30069': 'Marietta',
      '30188': 'Woodstock',
      '30189': 'Woodstock',
    };

    return cityByZipMap[zip] || '';
  }

  onZipChange() {
    const zipControl = this.profileForm.get('address.zip');
    if (zipControl) {
      const zip = zipControl.value;
      if (zip) {
        const city = this.getCityByZip(zip);
        const state = this.getStateByZip(zip);
        this.profileForm.get('address.city')?.setValue(city);
        this.profileForm.get('address.state')?.setValue(state);
      }
    }
  }

}