import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxLoadingModule } from 'ngx-loading';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxSpinnerModule,
    NgxLoadingModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'acesso-inteligente';
  public loading = false;

  constructor (
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    // this.spinner.show();

    setTimeout(() => {
      // this.spinner.hide();
      this.loading = false
    }, 3000);
  }
}
