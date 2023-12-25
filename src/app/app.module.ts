import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { FormsModule                   } from '@angular/forms';
import { MatListModule                 } from '@angular/material/list';
import { MatTableModule                } from '@angular/material/table';
import { MatPaginatorModule            } from '@angular/material/paginator';
import { MatTabsModule                 } from '@angular/material/tabs';
import { BrowserModule                 } from '@angular/platform-browser';
import { BrowserAnimationsModule       } from '@angular/platform-browser/animations';
import { ReactiveFormsModule           } from '@angular/forms';
import { HttpClientModule              } from '@angular/common/http';
import { RouterModule                  } from '@angular/router';
import { HashLocationStrategy          } from '@angular/common';
import { LocationStrategy              } from '@angular/common';
import { NgbModule                     } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent                  } from './app.component';
import { HomeWebComponent              } from './_modules/home/home-web/home-web.component';
import { FilesGenerationWebComponent   } from './_modules/files-generation/files-generation-web/files-generation-web.component';
import { FilesGenerationXLSComponent   } from './_modules/files-generation/files-generation-xls/files-generation-xls.component';
import { FilesGenerationCSVComponent   } from './_modules/files-generation/files-generation-csv/files-generation-csv.component';
import { FilesGenerationPDFComponent   } from './_modules/files-generation/files-generation-pdf/files-generation-pdf.component';
import { FilesGenerationZIPComponent   } from './_modules/files-generation/files-generation-zip/files-generation-zip.component';
import { AlgorithmWebComponent         } from './_modules/algorithm/algorithm-web/algorithm-web.component';
import { AlgorithmRegExComponent       } from './_modules/algorithm/algorithm-reg-ex/algorithm-reg-ex.component';
import { AlgorithmSortComponent        } from './_modules/algorithm/algorithm-sort/algorithm-sort.component';
import { AlgorithmDijkstraComponent    } from './_modules/algorithm/algorithm-dijkstra/algorithm-dijkstra.component';
import { AngularTutorialsnWebComponent } from './_modules/about/angular-tutorialsn-web/angular-tutorialsn-web.component';
import { AAboutWebComponent            } from './_modules/about/a-about-web/a-about-web.component';
import { UnitTestingComponent          } from './unit-testing/unit-testing.component';
import { SudokuComponent               } from './_modules/games/games-sudoku/games-sudoku.component';
import { TictactoeComponent            } from './_modules/games/tictactoe/tictactoe.component';
import { GameswebComponent             } from './_modules/games/gamesweb/gamesweb.component';
//
const routes = [
  {  path: 'Home'                  , component: HomeWebComponent                      },
  {  path: 'AlgorithmWeb'          , component: AlgorithmWebComponent                 },
  {  path: 'AlgorithmRegEx'        , component: AlgorithmRegExComponent               },
  {  path: 'AlgorithmSort'         , component: AlgorithmSortComponent                },
  {  path: 'AlgorithmDijkstra'     , component: AlgorithmDijkstraComponent            },
  {  path: 'FilesGenerationWeb'    , component: FilesGenerationWebComponent           },
  {  path: 'FilesGenerationXLS'    , component: FilesGenerationXLSComponent           },
  {  path: 'FilesGenerationCSV'    , component: FilesGenerationCSVComponent           },
  {  path: 'FilesGenerationPDF'    , component: FilesGenerationPDFComponent           },
  {  path: 'FilesGenerationZIP'    , component: FilesGenerationZIPComponent           },         
  {  path: 'AngularTutorialsnWeb'  , component: AngularTutorialsnWebComponent         },
  {  path: 'AAboutWeb'             , component: AAboutWebComponent                    },
  {  path: 'GamesSudoku'           , component: SudokuComponent                       },
  {  path: 'TicTacToe'             , component: TictactoeComponent                    },
  {  path: 'GamesWeb'              , component: GameswebComponent                     },
  {  path: '**'                    , component: AppComponent                          }, 
];
//
@Injectable({
  providedIn: 'root'
})
//
export class CustomErrorHandler implements ErrorHandler {
    //
    constructor() { } 
    //
    handleError(error: any): void 
    { 
      // 
      console.warn("[CUSTOM ERROR HANDLING]:\n"); 
    } 
}
//
@NgModule({
  declarations: [
    AppComponent,
    HomeWebComponent,  
    AlgorithmWebComponent,
    AlgorithmRegExComponent,
    AlgorithmSortComponent,
    AlgorithmDijkstraComponent,
    FilesGenerationWebComponent,
    FilesGenerationXLSComponent,
    FilesGenerationCSVComponent,
    FilesGenerationPDFComponent,
    FilesGenerationZIPComponent,
    AngularTutorialsnWebComponent,
    AAboutWebComponent,
    UnitTestingComponent,
    SudokuComponent,
    TictactoeComponent,
    GameswebComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    NgbModule,
    RouterModule,
    RouterModule.forRoot( routes, { useHash: true }),
  ], 
  exports  : [RouterModule],
  providers: [
                { provide: LocationStrategy   , useClass: HashLocationStrategy },
                { provide: ErrorHandler       , useClass: CustomErrorHandler   }
             ],
  bootstrap: [AppComponent]
})
//
export class AppModule { 
    //-----------------------------------------------------------------------------------------------------
    constructor(private _customErrorHandler : CustomErrorHandler) {
        //
        console.log("AppModule");      
    }  
}

