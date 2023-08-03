import { Component } from '@angular/core';
//
@Component({
  selector: 'app-files-generation-web',
  templateUrl: './files-generation-web.component.html',
  styleUrls: ['./files-generation-web.component.css']
})
//
export class FilesGenerationWebComponent {
  //
  static get PageTitle()   : string {
    return '[GENERAR ARCHIVOS]';
  }
  //
  readonly  pageTitle      : string = FilesGenerationWebComponent.PageTitle;
}
