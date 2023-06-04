import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { ClockComponent } from '../components/clock/clock.component';
import { ShowBooksComponent } from '../components/show-books/show-books.component';
import { SerwisService } from '../services/serwis.service'
import { ChooseBookComponent } from '../components/choose-book/choose-book.component';
import { WpiszZarobkiComponent } from '../components/wpisz-zarobki/wpisz-zarobki.component';
import { ChooseYearsComponent } from '../components/choose-years/choose-years.component';

let czasopisma = ['Atari_Age', 'Komputer', 'Atari_club', 'Moje_Atari', 'Avax', 'POKE', 'Bajtek', 'STEfan', 'Desktop_Info', 'Swiat_Atari', 'IKS']
const routes: Routes = [
  { path: '', component: WpiszZarobkiComponent},
  { path: 'choose-book', component: ChooseBookComponent },
  ...czasopisma.map(czasopismo => ({ path: czasopismo, component: ChooseYearsComponent })),
  ...czasopisma.map(czasopismo => ({ path: `${czasopismo}/:year`, component: ShowBooksComponent })),
  { path: '**', redirectTo: '/choose-book' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
