//import Component from core package
import {Component,OnInit} from '@angular/core';

//@ shows that this is a declarator 
//@Component tells that it is a Component
//standalone: default is true. standalone components specify their dependencies directly. See imports next
//imports: import other stand alone components or NgModules
//selector: the name of the html tag that you will use to add component to html
//templateUrl: tells where to find the template
//styleUrls: css for the template
@Component ({
    standalone: true,
    imports: [],
    selector: 'app-warning-message',
    templateUrl: './warning-message.component.html', 
    styleUrls: ['./warning-message.component.css'] 
})

//the class
export class WarningMessageComponent implements OnInit {
    constructor() { }
    ngOnInit() {
    }
}