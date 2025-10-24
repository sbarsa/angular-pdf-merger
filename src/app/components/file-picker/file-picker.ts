import {Component, ElementRef, viewChild} from '@angular/core';

@Component({
  selector: 'app-file-picker',
  imports: [],
  templateUrl: './file-picker.html',
  styleUrl: './file-picker.css',
})
export class FilePicker {
  private fileInput = viewChild<ElementRef<HTMLInputElement>>("fileInput");

  getSelectedFile(): File | undefined{
    const files = this.fileInput()?.nativeElement.files;
    return files ? files[0] : undefined;

  }


}
