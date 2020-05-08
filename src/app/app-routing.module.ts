import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { IndexComponent } from './pages/index/index.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizListComponent } from './pages/quiz/quiz-list/quiz-list.component';
import { QuizEditComponent } from './pages/quiz/quiz-edit/quiz-edit.component';
import { QuizAddComponent } from './pages/quiz/quiz-add/quiz-add.component';
import { QuizViewComponent } from './pages/quiz/quiz-view/quiz-view.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserViewComponent } from './pages/user/user-view/user-view.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ExamComponent } from './pages/exam/exam/exam.component';
import { ExamListComponent } from './pages/exam/exam-list/exam-list.component';
import { ExamLoginComponent } from './pages/exam/exam-login/exam-login.component';
import { QuizExamComponent } from './pages/exam/quiz-exam/quiz-exam.component';

const routes: Routes = [
  { 
    path: '',
    component: IndexComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  { 
    path: 'quiz',
    component: QuizComponent,
    data: {
      breadcrumb: 'Quiz'
    },
    children: [
      { 
        path: '',
        component: QuizListComponent
      },
      { 
        path: 'add',
        component: QuizAddComponent,
        data: {
          breadcrumb: 'Add'
        }
      },
      { 
        path: 'edit/:id',
        component: QuizEditComponent,
        data: {
          breadcrumb: 'Edit'
        }
      },
      { 
        path: 'view/:id',
        component: QuizViewComponent,
        data: {
          breadcrumb: 'View'
        }
      }
    ]
  },
  {
    path: 'exam',
    component: ExamComponent,
    data: {
      breadcrumb: 'Exam'
    },
    children: [
      { 
        path: '',
        component: ExamListComponent,
        data: {
          breadcrumb: 'Exams'
        }
      },
      { 
        path: 'login/:id',
        component: ExamLoginComponent,
        data: {
          breadcrumb: 'Login'
        }
      },
      { 
        path: 'quiz/:id/:user',
        component: QuizExamComponent,
        data: {
          breadcrumb: 'Quiz'
        }
      }
    ]
  },
  { 
    path: 'user',
    component: UserComponent,
    data: {
      breadcrumb: 'User'
    },
    children: [
      { 
        path: '',
        component: UserListComponent
      },
      { 
        path: 'view/:id',
        component: UserViewComponent,
        data: {
          breadcrumb: 'View'
        }
      }
    ]
  },
  { 
    path: '**',
    component: PageNotFoundComponent,
    data: {
      breadcrumb: 'Page not found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [IndexComponent,
                                  QuizComponent,
                                  QuizListComponent,
                                  QuizEditComponent,
                                  QuizAddComponent,
                                  QuizViewComponent,
                                  UserComponent,
                                  UserListComponent,
                                  UserViewComponent,
                                  PageNotFoundComponent,
                                  ExamComponent,
                                  ExamListComponent,
                                  ExamLoginComponent,
                                  QuizExamComponent
                                ]
