import { Injectable, OnInit                                      } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders         } from '@angular/common/http';
import { HttpRequest, HttpResponse  , HttpInterceptor            } from '@angular/common/http';
import { Observable                                              } from 'rxjs';
import { LogEntry, LogType, SearchCriteria                       } from '../_models/entityInfo.model';
import { ConfigService                                           } from './config.service';
//
@Injectable({
  providedIn: 'root'
})
//
export class MCSDService implements OnInit {
    ////////////////////////////////////////////////////////////////  
    // CAMPOS
    ////////////////////////////////////////////////////////////////  
    public HTTPOptions_Text = {
      headers: new HttpHeaders({
        'Accept':'application/text'
      }),
      'responseType'  : 'text' as 'json'
    };
    //    
    public HTTPOptions_JSON = {
      headers: new HttpHeaders({
       'Content-Type' : 'application/json'
      })
      ,'responseType' : 'text' as 'json'
    }; 
    //
    public get _prefix()   : string | undefined {
      //
      console.warn("[CONFIG_SERVICE] : BaseUrl : " + this.configService.baseUrl );      
      //            
      return this.configService.baseUrl;
    }
    //
    ////////////////////////////////////////////////////////////////  
    // METODOS - [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    //
    ngOnInit(): void {
      //
    }
    //
    constructor(public http: HttpClient,public configService : ConfigService) { 
      //
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    _GetWebApiAppVersion(): Observable<string>
    {
      //
      let p_url         : string  = `${this._prefix}demos/_GetAppVersion`;
      //
      let appVersion    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return appVersion;
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO CSV]
    ////////////////////////////////////////////////////////////////  
    getCSVLinkGET(): Observable<string> {
      //
      let p_url    = this._prefix + 'demos/_GetCSVLinkJsonGET';
      //
      let csvLink : Observable<string> =  this.http.get<string>(p_url);
      //
      return csvLink; 
    }
    //
    getCSVLink(): Observable<string> {
      //
      let p_url    = this._prefix + 'demos/_GetCSVLinkJson';
      //
      let csvLink : Observable<string> =  this.http.post<string>(p_url,this.HTTPOptions_Text);
      //
      return csvLink; 
    }
    //    
    getInformeRemotoCSV(): Observable<string> {
      //
      let p_url    = this._prefix + 'demos/GenerarInformeCSVJson';
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return jsonCSVData; 
    }
    //
    getInformeRemotoCSV_STAT():Observable<string> {
        //
        let p_url    = this._prefix + 'demos/GenerarInformeCSVJsonSTAT';
        //
        let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
        //
        return jsonCSVData; 
    }
    //
    _SetSTATPieCache(_prefix : string | undefined):void{
      //
      let p_url    =  `${_prefix}demos/_SetSTATPieCache`;
      //
      let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      const jsonCSVDataObserver = {
        next: (jsondata: string)     => { 
          //
          console.log('_SetSTATPieCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          console.error('_SetSTATPieCache- (ERROR) : ' + JSON.stringify(err.message));
        },
        complete        : ()                => {
          //
          console.log('_SetSTATPieCache -  (COMPLETE)');
        },
      };
      //
      jsonCSVData.subscribe(jsonCSVDataObserver); 
    }
    //    
    getInformeRemotoCSV_NodeJS(): Observable<string> {
    //
    let p_url    = 'https://ms7tks-4000.csb.app/GenerarInformeCSVJson';
    //
    console.warn(" REQUESTING URL : " + p_url);
    //
    var HTTPOptions = {
      headers: new HttpHeaders({
        'Accept':'application/text'
      }),
      'responseType': 'text' as 'json'
    };
    //
    let jsonCSVData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
    //
    return jsonCSVData; 
  }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO XLS]
    ////////////////////////////////////////////////////////////////  
    //
    getLogRemoto(_searchCriteria : SearchCriteria) {
        //
        let url    = this._prefix + 'demos/generarinformejson';
        //    
        return this.http.get<LogEntry[]>(url);
    }
    //
    getLogRemotoNodeJS(_searchCriteria : SearchCriteria) : Observable<string>{
      //
      let p_url       : string = `https://ms7tks-4000.csb.app/generarinformejson`;
      //
      let nodeJsOutput: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_JSON,
      );
      //
      console.log('getLogRemotoNodeJS : ' + p_url);
      //
      return nodeJsOutput;
    }
    //
    getInformeExcel(_searchCriteria : SearchCriteria){
        //
        let p_url  = this._prefix + 'demos/generarinformexls';
        //
        let excelFileName : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
        //
        return excelFileName; 
    }
    //
    getLogStatPOST() {
      //
      let url    = `${this._prefix}demos/GetConsultaLogStatPost`;
      //
      return this.http.post<string>(url,this.HTTPOptions_JSON);   
    }    
    //
    getLogStatGET() {
      //
      let url    = `${this._prefix}demos/GetConsultaLogStatGet`;
      //
      return this.http.get<LogEntry[]>(url);   
    } 
    //
    _SetSTATBarCache(_prefix : string | undefined) : void {
      //
      let url    = `${_prefix}demos/_SetSTATBarCache`;
      //
      let jsonDataObservable : Observable<string> = this.http.get<string>(url,this.HTTPOptions_Text);   
      //
      const jsonDataOberver = {
        next: (jsondata: string)     => { 
          //
          console.log('_SetSTATBarCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          console.error('_SetSTATBarCache- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          console.log('_SetSTATBarCache -  (COMPLETE)');
        },
      };
      //
      jsonDataObservable.subscribe(jsonDataOberver);
    } 
    //////////////////////////////////////////////////////////////
    // GET ZIP / FILE UPLODAD METHODS
    //////////////////////////////////////////////////////////////
    upload(file: File) : Observable<HttpEvent<any>> {
      //
      const formData: FormData = new FormData();
      //
      formData.append('file', file);
      //
      let url    = `${this._prefix}demos/_ZipDemoGetFileName`;
      //
      console.log("[GENERATE ZIP FILE] - (UPLOADING FILE) url: " + url);
      // USAR REQUEST PARA OBTENER PORCENTAJE DE STATUS
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
        responseType  : 'text',
      });
      //
      return this.http.request<HttpEvent<any>>(req);
    }
    //
    SetZip(p_fileName : string | undefined):Observable<string> {
        //
        let p_url   = `${this._prefix}demos/_SetZip?p_fileName=${p_fileName}`;
        //
        console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - fileName: " + p_fileName);
        //
        console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - url     : " + p_url);
        //
        let returnUrl     : Observable<string> = this.http.get<string>(p_url,this.HTTPOptions_JSON); 
        //
        return returnUrl;   
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVOS  - PDF]
    ////////////////////////////////////////////////////////////////
    public GetPDF(subjectName: string | undefined): Observable<HttpEvent<any>> {
        //
        let p_url   = `${this._prefix}demos/_GetPdf?subjectName=${subjectName}`;
        //
        console.log("[GENERATE PDF FILE] - [GETTING ZIP] - subjectName  : " + subjectName);
        //
        console.log("[GENERATE PDF FILE] - [GETTING ZIP] - url          : " + p_url);
        // USAR REQUEST PARA OBTENER PORCENTAJE DE STATUS
        const req = new HttpRequest('GET', p_url, {
          reportProgress: true,
          responseType  : 'text',
        });
        //
        return this.http.request<HttpEvent<any>>(req);
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - DISTANCIA MAS CORTA]
    ////////////////////////////////////////////////////////////////  
    //    
    getRandomVertex(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._prefix}demos/GenerateRandomVertex?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    //
    getRandomVertexCpp(vertexSize : Number,sourcePoint : Number): Observable<string> {
      //
      let p_url    = `${this._prefix}demos/GenerateRandomVertex_CPP?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return dijkstraData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - ORDENAMIENTO]
    ////////////////////////////////////////////////////////////////     
    getNewSort():Observable<string>
    {
      //
      let p_url    = `${this._prefix}demos/_NewSort`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    getSort(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._prefix}demos/_GetSort?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    //    
    getSort_CPP(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this._prefix}demos/_GetSort_CPP?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return newSortData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - EXPRESIONES REGULARES]
    ////////////////////////////////////////////////////////////////  
    //    
    _GetXmlData():Observable<string>
    {
      //
      let p_url  : string  = `${this._prefix}demos/_GetXmlData`;
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return xmlData; 
    }
    //
    _SetXmlDataToCache(_prefix : string | undefined):void
    {
      //
      let p_url   : string  = `${_prefix}demos/_SetXmlDataToCache`;
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      const td_observer = {
        next: (jsondata: string)     => { 
          //
          console.log('_SetXmlDataToCache - (return): ' + jsondata);
        },
        error           : (err: Error)      => {
          //
          console.error('_SetXmlDataToCache- (ERROR) : ' + JSON.stringify(err.message));
          //
        },
        complete        : ()                => {
          //
          console.log('_SetXmlDataToCache -  (COMPLETE)');
        },
      };
      //
      xmlData.subscribe(td_observer);
    }
    //
    public _RegExEval(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this._prefix}demos/_RegExEval?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
    //
    public _RegExEval_CPP(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this._prefix}demos/_RegExEval_CPP?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return regExData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [LOG]
    ////////////////////////////////////////////////////////////////  
    //
    public SetLog(p_PageTitle : string ,p_logMsg : string, logType : LogType = LogType.Info):void
    {
      //
      let logInfo!  : Observable<string>;
      //
      let p_url     = `${this._prefix}demos/_SetLog?p_logMsg=${p_logMsg}&logType=${logType.toString()}`;
      //
      logInfo       = this.http.get<string>(p_url, this.HTTPOptions_Text);
      //
      const logInfoObserver   = {
            //
            next: (logResult: string)     => { 
                  //
                  console.warn(p_PageTitle +  ' - [LOG] - [RESULT] : ' + logResult);
            },
            error: (err: Error) => {
                  //
                  console.error(p_PageTitle + ' - [LOG] - [ERROR]  : ' + err);
            },       
            complete: ()        => {
                  //
                  console.info(p_PageTitle  + ' - [LOG] - [COMPLETE]');
            },
        };
        //
        logInfo.subscribe(logInfoObserver);
    };
    ////////////////////////////////////////////////////////////////  
    // GAMES
    //////////////////////////////////////////////////////////////// 
     //
     _GetSudoku_NodeJS(): Observable<string> {
      //
      let p_url: string = 'https://ms7tks-4000.csb.app/Sudoku_Generate_NodeJS';
      //
      let sudokuGenerated: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_JSON,
      );
      //
      return sudokuGenerated;
    } 
    //
    _GetSudoku(): Observable<string>
    {
      // 
      let p_url              : string  = `${this._prefix}Demos/Sudoku_Generate_CPP`;
      //
      let sudokuGenerated    : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
      //
      return sudokuGenerated;
    };
   //
   _SolveSudoku(p_matrix : string): Observable<string>
   {
     // 
     let p_url               : string  = `https://webapiangulardemo.somee.com/Demos/Sudoku_Solve_CPP?p_matrix=${p_matrix}`
     //
     let sudokuSolved        : Observable<string> =  this.http.get<string>(p_url,this.HTTPOptions_Text);
     //
     return sudokuSolved;
   };
    //
    _SolveSudoku_NodeJS(p_matrix: string): Observable<string> {
      //
      let p_url: string = `https://ms7tks-4000.csb.app/Sudoku_Solve_NodeJS?p_matrix=${p_matrix}`;
      //
      let sudokuSolved: Observable<string> = this.http.get<string>(
        p_url,
        this.HTTPOptions_Text,
      );
      //
      return sudokuSolved;
    }
         //-------------------------------------------------------------
  // FILE UPLODAD METHODS
  //-------------------------------------------------------------
  uploadSudoku(file: File): Observable<HttpEvent<any>> {
    //
    const formData: FormData = new FormData();
    //
    formData.append('file', file);
    //
    let url = `${this._prefix}demos/Sudoku_Upload_File`;
    //
    console.log('[SUDOKU] - (UPLOADING FILE) url: ' + url);
    //
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    //
    return this.http.request<HttpEvent<any>>(req);
  }

}
  