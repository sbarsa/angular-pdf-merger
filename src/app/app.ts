import {Component, inject, signal, viewChild, viewChildren} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FilePicker} from './components/file-picker/file-picker';
import {MergeButton} from './components/merge-button/merge-button';
import {Merger} from './services/merger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilePicker, MergeButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-pdf-merger');

  filePickers = viewChildren(FilePicker);
  mergerService = inject(Merger);

  async triggerAlert() {
    const pickers = this.filePickers();
    alert(`First: ${pickers[0]?.getSelectedFile()?.name}, Second: ${pickers[1]?.getSelectedFile()?.name}`);

    const file1 = pickers[0]?.getSelectedFile();
    const file2 = pickers[1]?.getSelectedFile();

    if (file1 && file2) {
      const mergedBlob = await this.mergerService.merge(file1, file2);
      const url = URL.createObjectURL(mergedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged-labels.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('Please select both files before merging');
    }
  }

}
