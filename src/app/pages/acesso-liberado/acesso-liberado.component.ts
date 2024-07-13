import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso-liberado',
  standalone: true,
  imports: [],
  templateUrl: './acesso-liberado.component.html',
  styleUrl: './acesso-liberado.component.css'
})
export class AcessoLiberadoComponent implements OnInit{

  constructor (private router: Router) {

  }
  ngOnInit(): void {
    setTimeout (() => {
      this.router.navigate(['/'])
    }, 10000) 
  }
}
