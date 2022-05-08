import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { zorroModule } from '../third_lib/Zorro/zorro_Modules';
import { ContentComponent } from './components/content/content.component';
import { EmptyComponent } from './components/Empty/Empty.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchComponent } from './components/search/search.component';
import { SelectComponent } from './components/select/select.component';
import { ChangeDatePipe } from './pipes/change-date.pipe';
import { FontColorPipe } from './pipes/font-color.pipe';
import { HtmlFormatPipe } from './pipes/html-format.pipe';
import { SafeurlPipe } from './pipes/safeurl.pipe';
const SELFCOMPONENTS = [
  EmptyComponent,
  SelectComponent,
  LoadingComponent,
  SearchComponent,
  ContentComponent,
];
const DIRECTIVES: never[] = [
];
const PIPES = [
  FontColorPipe,
  ChangeDatePipe,
  HtmlFormatPipe,
  SafeurlPipe
];
@NgModule({
  declarations: [
    ...SELFCOMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  imports: [
    ...zorroModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ...SELFCOMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ]
})
export class SharedModule { }