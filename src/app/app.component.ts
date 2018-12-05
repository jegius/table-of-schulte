import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public rows: Row[];
  public seconds: number;
  public interval: any;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.code === 'Space') {
      this.reset();
      this.startTimer();
    }
  }

  ngOnInit() {
    this.rows = this.createRows();
    this.seconds = 30;
  }

  private getCells(): Cell[] {
    let randomsCells: Cell[] = [];
    const checkCell = () => {
      let randomNumber = Math.ceil(Math.random() * 25) - 1;
      return randomsCells[randomNumber]
        ? checkCell()
        : randomNumber;
    };
    for (let i = 25; i > 0; i--) {
      randomsCells[checkCell()] = new Cell(i, 'normal-cell');
    }
    return randomsCells;
  }

  private createRows(): Row[] {
    let randomNumbers: Cell[] = this.getCells();
    let rows: Row[] = [];

    for (let i = 0; i < 5; i++) {
      let row: Row = {cells: []};
      for (let y = 0; y < 5; y++) {
        let cell: Cell = randomNumbers.pop();

        if (i === 2 && y === 2) {
          cell.customClass = 'center';
        }
        row.cells.push(cell);
      }
      rows.push(row);
    }
    return rows
  }

  public reset(): void {
    this.resetTimer();
    this.rows = this.createRows();
  }

  public startTimer(): void {
    this.seconds = 30;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds = this.seconds - 1
      } else {
        clearInterval(this.interval);
      }
    }, 1000);

  }

  public resetTimer(): void {
    clearInterval(this.interval);
    this.seconds = 30;
  }
}

export class Row {
  constructor(
    public cells: Cell[]) {
  };
}

export class Cell {
  constructor(
    public number: number,
    public customClass: string) {
  }
}

