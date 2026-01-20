import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  solution(a: number, b: number): string {
    if (a === 0 && b === 0) {
      return "Vô số nghiệm";
    } else if (a === 0 && b !== 0) {
      return "Vô nghiệm";
    } else {
      let x = -b / a;
      return "x = " + x;
    }
  }

  get_solution(a: string, b: string, tdrs: HTMLElement) {
    let a_number = parseFloat(a);
    let b_number = parseFloat(b);
    let result = this.solution(a_number, b_number);
    tdrs.innerText = result;
  }
  clear_data(tda: HTMLInputElement, tdb: HTMLInputElement, tdrs: HTMLElement) {
    tda.value="";
    tdb.value="";
    tdrs.innerText="";
    tda.focus();
  }
}