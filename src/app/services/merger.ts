import { Injectable } from '@angular/core';
import { PDFDocument, degrees } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class Merger {
  async merge(file1: File, file2: File): Promise<Blob> {
    // Read both files as ArrayBuffers
    const [file1Bytes, file2Bytes] = await Promise.all([
      file1.arrayBuffer(),
      file2.arrayBuffer()
    ]);

    // Load both PDF documents
    const [pdf1, pdf2] = await Promise.all([
      PDFDocument.load(file1Bytes),
      PDFDocument.load(file2Bytes)
    ]);

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Get the first page from each PDF
    const page1 = pdf1.getPage(0);
    const page2 = pdf2.getPage(0);

    // Embed the pages
    const [embeddedPage1, embeddedPage2] = await Promise.all([
      mergedPdf.embedPage(page1),
      mergedPdf.embedPage(page2)
    ]);

    // Get original page dimensions (portrait)
    const { width: portraitWidth, height: portraitHeight } = page1.getSize();

    // Create a landscape page (width = 2 * portrait width, height = portrait height)
    const landscapePage = mergedPdf.addPage([portraitWidth * 2, portraitHeight]);

    // Embed both pages side-by-side, rotated 90 degrees
    landscapePage.drawPage(embeddedPage1, {
      x: 0,
      y: 0,
      width: portraitWidth,
      height: portraitHeight,
    });

    landscapePage.drawPage(embeddedPage2, {
      x: portraitWidth,
      y: 0,
      width: portraitWidth,
      height: portraitHeight,
    });

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    return new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
  }
}
