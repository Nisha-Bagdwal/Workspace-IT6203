import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NameEditorComponent, ProfileEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT6203';
}
