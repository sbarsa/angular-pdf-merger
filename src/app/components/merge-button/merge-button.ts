import {Component, output} from '@angular/core';

@Component({
  selector: 'app-merge-button',
  imports: [],
  templateUrl: './merge-button.html',
  styleUrl: './merge-button.css',
})
export class MergeButton {

  clicked = output<void>();

  buttonClicked() {
    this.clicked.emit();
  }
}
