import {Component, signal, viewChild, viewChildren} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FilePicker} from './components/file-picker/file-picker';
import {MergeButton} from './components/merge-button/merge-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilePicker, MergeButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-pdf-merger');

  filePickers = viewChildren(FilePicker);

  triggerAlert() {
    const pickers = this.filePickers();
    alert(`First: ${pickers[0]?.getSelectedFile()?.name}, Second: ${pickers[1]?.getSelectedFile()?.name}`);
  }
}
