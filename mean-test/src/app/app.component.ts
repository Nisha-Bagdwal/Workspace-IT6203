import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { WarningMessageComponent } from './warning-message/warning-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { SelectorComponent } from './selector/selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ProfileEditorComponent, 
    AddressFormComponent,
    WarningMessageComponent, 
    SuccessMessageComponent,
    SelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT6203';
}
