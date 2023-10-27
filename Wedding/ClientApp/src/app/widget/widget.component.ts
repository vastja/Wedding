import { Component } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  public transform = '';

  private _turns = 0;

  public set turns(value : number) {
    this._turns = value;
    this.transform = `rotate(${this._turns}turn)`
  };

  public get turns() : number {
    return this._turns;
  }

  public static readonly oneTurn = 0.1;

  public back() : void {
    this.turns += WidgetComponent.oneTurn;
    console.log('back');
  }

  public forward() : void {
    this.turns -= WidgetComponent.oneTurn;
    console.log('forward');
  }

}
