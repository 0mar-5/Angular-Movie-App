import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Search } from '../../pages/search/search';
@Component({
  selector: 'app-hero',
  imports: [CardModule, InputTextModule, ButtonModule, Search],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
