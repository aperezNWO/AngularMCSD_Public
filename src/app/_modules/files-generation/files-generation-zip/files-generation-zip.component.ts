import { Component, OnInit                   } from '@angular/core';
import { HttpEventType, HttpResponse         } from '@angular/common/http';
import { Observable                          } from 'rxjs';
import { MCSDService                         } from '../../../_services/mcsd.service';
import { CustomErrorHandler                  } from '../../../app.module';
//
@Component({
  selector: 'app-files-generation-zip',
  templateUrl: './files-generation-zip.component.html',
  styleUrls: ['./files-generation-zip.component.css']
})
//
export class FilesGenerationZIPComponent {
  //--------------------------------------------------------------------------
  // PROPIEDADES COMUNES
  //--------------------------------------------------------------------------
  //
  public static get PageTitle()   : string {
    return '[GENERAR ARCHIVOS ZIP]';
  }
  //
  readonly pageTitle              : string = FilesGenerationZIPComponent.PageTitle;
  //
  //--------------------------------------------------------------------------
  // PROPIEDADES - FILE UPLOAD - FORM SUBMIT
  //--------------------------------------------------------------------------
  public urlPost       : string='https://mcsd.somee.com/Demos/_ZipDemo';
  //
  //--------------------------------------------------------------------------
  // PROPIEDADES - FILE UPLOAD  - BYTESTREAM
  //--------------------------------------------------------------------------
  selectedFiles?         : FileList;
  currentFile?           : File;
  progress               : number  = 0;
  message                : string  = '';
  downloadLink           : string  = '';
  //--------------------------------------------------------------------------
  // EVENT HANDLERS / CONSTRUCTORS  
  //--------------------------------------------------------------------------
  constructor(private mcsdService: MCSDService, customErrorHandler: CustomErrorHandler) {
    //
    console.log(this.pageTitle + " - [INGRESO]");
  }
  //--------------------------------------------------------------------------
  // METODOS COMUNES
  //--------------------------------------------------------------------------
  //
  //--------------------------------------------------------------------------
  // METODOS - FILE UPLOAD COMPONENT
  //--------------------------------------------------------------------------
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  //
  upload(): void {
    //  
    this.progress = 0;
    //
    this.message  = "...cargando...";
    //
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //
      if (file) {
        //
        this.currentFile = file;
        //
        this.mcsdService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) 
            {
              //
              this.progress = Math.round(100 * event.loaded / event.total);
            } 
            else if (event instanceof HttpResponse) 
            {
              //
              console.log("RESPONSE : " + event.body);
              //
              this.message = event.body;
            }
          },
          error: (err: any) => {
            //
            console.log(err);
            //
            this.progress = 0;
            //  
            if (err.error && err.error.message) 
            {
              //
              this.message = err.error.message;
            } 
            else 
            {
              //
              this.message = 'Could not upload the file!';
            }
            //
            this.currentFile = undefined;
          }
        });
      }
      //
      this.selectedFiles = undefined;
    }
  }
  //--------------------------------------------------------------------------
  // METODOS - FILE UPLOAD COMPONENT
  //--------------------------------------------------------------------------
  SetZip():void{
      //
      let uploadedFileName  : string | undefined = this.currentFile?.name; 
      //
      let fileName!         : Observable<string>; 
      //
      fileName              = this.mcsdService.SetZip(uploadedFileName);
      //
      const setZipObserver  = {
           //
           next: (p_zipFile: string) => { 
            //
            let downloadLink_1 = (this.mcsdService.prefix + p_zipFile);
            //
            while (downloadLink_1.indexOf("\"") > -1) 
                downloadLink_1 = downloadLink_1.replace("\"", "");
            //
            this.downloadLink  = this.mcsdService.DebugHostingContent(downloadLink_1);
            //
            console.log('[Download link] : ' + this.downloadLink);
            // los botones se configuran en el evento "complete()".
          },
          error: (err: Error) => {
            //
            console.error('Observer got an error: ' + err);
            //
            this.downloadLink = "";
            //
          },       
          complete: ()        => {
            //
            console.log('Observer got a complete notification');
            //
          },
      }
      //
      fileName.subscribe(setZipObserver);
  }
}
