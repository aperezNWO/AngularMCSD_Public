import { Injectable                                      } from '@angular/core';
import { LogEntry, SearchCriteria                        } from './log-info.model';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable                                      } from 'rxjs';
//
@Injectable({
  providedIn: 'root'
})
//
export class MCSDService {
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
    public static get _prefix()   : string {
      //public prefix        : string = 'http://localhost:81/';
      //public prefix        : string = 'https://mcsd.somee.com/';
      //
      return 'https://webapiangulardemo.somee.com/';
    }
    readonly prefix          : string = MCSDService._prefix;
    ////////////////////////////////////////////////////////////////  
    // METODOS - [EVENT HANDLERS]
    ////////////////////////////////////////////////////////////////  
    //
    constructor(private http: HttpClient) { 
        //
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [COMUNES]
    ////////////////////////////////////////////////////////////////  
    //
    public DebugHostingContent(msg : string) : string {
      //
      console.log("cadena a evaular : " + msg);
      //
      let regEx   = /(.*)(<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->)(.*\w+.*)(<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->)(.*)/;
      //
      let strMsg  = msg.replace(/(\r\n|\n|\r)/gm, "");
      //
      let matches = strMsg.match(regEx);
      //
      if (matches != null) {
          //
          for (var index = 1; index < matches.length; index++) {
              //
              var matchValue = matches[index];
              //        
              console.log("coincidencia : " + matchValue);
              //
              if ((matchValue.indexOf("<!--SCRIPT GENERATED BY SERVER! PLEASE REMOVE-->") != -1) && (matchValue.trim() != "")) {
                  //
                  strMsg = strMsg.replace(matchValue, "");
                  //
                  console.log("REEMPLAZANDO. NUEVA CADENA : " + strMsg);
              }
              //
              if ((matchValue.indexOf("<center>") != -1) && (matchValue.trim() != "")) {
                  //
                  strMsg = strMsg.replace(matchValue, "");
                  //
                  console.log("REEMPLAZANDO. NUEVA CADENA : " + strMsg);
              }
          }
        }
        else
            console.log("NO_HAY_COINCIDENCIAS");
        //
        console.log("CADENA DEPURADA : " + strMsg);
        //
        strMsg = strMsg.replace("unsafe:", "");
        //
        return strMsg;
    };
    ////////////////////////////////////////////////////////////////  
    // METODOS - [GENERAR ARCHIVO CSV]
    ////////////////////////////////////////////////////////////////  
    getCSVLink(): Observable<string> {
      //
      let p_url    = this.prefix + 'demos/_GetCSVLinkJson';
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
      let csvLink : Observable<string> =  this.http.post<string>(p_url,HTTPOptions);
      //
      return csvLink; 
    }
    //    
    getInformeRemotoCSV(): Observable<string> {
      //
      let p_url    = this.prefix + 'demos/GenerarInformeCSVJson';
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
    //
    getInformeRemotoCSV_STAT():Observable<string> {
          //
          let p_url    = this.prefix + 'demos/GenerarInformeCSVJsonSTAT';
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
        let url    = this.prefix + 'demos/generarinformejson';
        //
        console.warn(" REQUESTING URL : " + url);
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
        let p_url       = this.prefix + 'demos/generarinformexls';
        //
        var HTTPOptions = {
          headers: new HttpHeaders({
            'Accept':'application/text'
          }),
          'responseType': 'text' as 'json'
        };
        //
        let excelFileName : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
        //
        return excelFileName; 
    }
    //
    getLogStatPOST() {
      //
      let url    = `${this.prefix}demos/GetConsultaLogStatPost`;
      //
      console.warn(" REQUESTING URL : " + url);
      //    
      var HTTPOptions = {
        headers: new HttpHeaders({
              'Content-Type' : 'application/json'
        })
        ,'responseType' : 'text' as 'json'
      }; 
      //
      return this.http.post<string>(url,HTTPOptions);   
    }     
    //-------------------------------------------------------------
    // FILE UPLODAD METHODS
    //-------------------------------------------------------------
    upload(file: File) : Observable<HttpEvent<any>> {
      //
      const formData: FormData = new FormData();
      //
      formData.append('file', file);
      //
      let url    = `${this.prefix}demos/_ZipDemoGetFileName`;
      //
      console.log("[GENERATE ZIP FILE] - (UPLOADING FILE) url: " + url);
      //
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true,
        responseType  : 'text',
      });
      //
      return this.http.request<HttpEvent<any>>(req);
    }
    //------------------------------------------------------------
    // GET ZIP - METHODS
    //------------------------------------------------------------
    SetZip(p_fileName : string | undefined):Observable<string> {
        //
        let p_url   = `${this.prefix}demos/_SetZip?p_fileName=${p_fileName}`;
        //
        console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - fileName: " + p_fileName);
        //
        console.log("[GENERATE ZIP FILE] - [GETTING ZIP] - url     : " + p_url);
        //
        var HTTPOptions = {
          headers: new HttpHeaders({
              'Content-Type' : 'application/text'
          })
          ,'responseType' : 'text' as 'json'
        }; 
        //
        let returnUrl     : Observable<string> = this.http.get<string>(p_url,HTTPOptions); 
        //
        return returnUrl;   
    }
    //------------------------------------------------------------
    // GET PDF - METHODS
    //------------------------------------------------------------
    public GetPDF(subjectName: string | undefined): Observable<HttpEvent<any>> {
        //
        let p_url   = `${this.prefix}demos/_GetPdf?subjectName=${subjectName}`;
        //
        console.log("[GENERATE PDF FILE] - [GETTING ZIP] - subjectName  : " + subjectName);
        //
        console.log("[GENERATE PDF FILE] - [GETTING ZIP] - url          : " + p_url);
        //
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
      let p_url    = `${this.prefix}demos/GenerateRandomVertex?p_vertexSize=${vertexSize}&p_sourcePoint=${sourcePoint}`;
      //
      console.info(" REQUESTING URL : " + p_url);
      //
      var HTTPOptions = {
        headers: new HttpHeaders({
          'Accept':'application/text'
        }),
        'responseType': 'text' as 'json'
      };
      //
      let dijkstraData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
      //
      return dijkstraData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - DISTANCIA MAS CORTA]
    ////////////////////////////////////////////////////////////////  
    //    
    getNewSort():Observable<string>
    {
      //
      let p_url    = `${this.prefix}demos/_NewSort`;
      //
      console.info(" REQUESTING URL : " + p_url);
      //
      var HTTPOptions = {
        headers: new HttpHeaders({
          'Accept':'application/text'
        }),
        'responseType': 'text' as 'json'
      };
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
      //
      return newSortData; 
    }
    //    
    getSort(p_sortAlgoritm: number, p_unsortedList: string):Observable<string>
    {
      //
      let p_url    = `${this.prefix}demos/_GetSort?p_sortAlgoritm=${p_sortAlgoritm}&p_unsortedList=${p_unsortedList}`;
      //
      console.info(" REQUESTING URL : " + p_url);
      //
      var HTTPOptions = {
        headers: new HttpHeaders({
          'Accept':'application/text'
        }),
        'responseType': 'text' as 'json'
      };
      //
      let newSortData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
      //
      return newSortData; 
    }
    ////////////////////////////////////////////////////////////////  
    // METODOS - [ALGORITMOS - ORDENAMIENTO]
    ////////////////////////////////////////////////////////////////  
    //    
    _GetXmlData():Observable<string>
    {
      //
      let p_url  : string  = `${this.prefix}demos/_GetXmlData`;
      //
      console.info(" REQUESTING URL : " + p_url);
      //
      var HTTPOptions = {
        headers: new HttpHeaders({
          'Accept':'application/text'
        }),
        'responseType': 'text' as 'json'
      };
      //
      let xmlData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
      //
      return xmlData; 
    }
    //
    public _RegExEval(tagSearchIndex: number, textSearchValue: string): Observable<string>
    {
      //
      let p_url    : string = `${this.prefix}demos/_RegExEval?p_tagSearch=${tagSearchIndex}&p_textSearch=${textSearchValue}`;
      //
      console.info(" REQUESTING URL : " + p_url);
      //
      var HTTPOptions = {
        headers: new HttpHeaders({
          'Accept':'application/text'
        }),
        'responseType': 'text' as 'json'
      };
      //
      let regExData : Observable<string> =  this.http.get<string>(p_url,HTTPOptions);
      //
      return regExData; 
    }
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
     let p_url              : string  = 'https://webapiangulardemo.somee.com/Demos/Sudoku_Generate_CPP';
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

}
