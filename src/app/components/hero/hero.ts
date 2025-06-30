import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-hero',
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  searchQuery = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }
}
