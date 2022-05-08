import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { zorroModule } from './third_lib/Zorro/zorro_Modules';
import { AppInitializerProvider } from './base/core-net/theme/app-initializer.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    ...zorroModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppInitializerProvider,
    { provide: NzMessageService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
