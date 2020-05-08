import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizService } from './services/quiz.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './services/breadcrumb.service';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
// import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { MessageDisplayComponent } from './components/message-display/message-display.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FormQuizComponent } from './components/form-quiz/form-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    BreadcrumbComponent,
    DeleteDialogComponent,
    FieldErrorDisplayComponent,
    MessageDisplayComponent,
    SearchFormComponent,
    FormQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    QuizService,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
