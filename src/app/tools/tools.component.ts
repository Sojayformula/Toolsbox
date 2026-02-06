import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  imports: [FormsModule, CommonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {


  constructor(private router: Router){}



    CRMPage(){
    this.router.navigate(['/crmdashboard'])
  }

}
