import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent {
  clicked = false;
  buttonName = 'Click me!';
  firstName = '';

  buttonClicked() {
    this.clicked = true;
    this.buttonName = 'Clicked';
  }

  buttonOnMouseOver() {
    console.log('Press the button');
  }
}
