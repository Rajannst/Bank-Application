import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private router:Router){}
  ngOnInit(): void {
  }
  goTologin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
