import { Routes } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',  //default component to display
        component: ListStudentsComponent
    }, {
        path: 'addStudent',  //when students added 
        component: StudentFormComponent
    }, {
        path: 'listStudents',  //when students listed
        component: ListStudentsComponent
    }, 
    {
        path: 'editStudent/:_id',  //when students edited 
        component: StudentFormComponent
    }, {
        path: '**',  //when path cannot be found, keep this at the bottom
        component: NotFoundComponent
    }
];