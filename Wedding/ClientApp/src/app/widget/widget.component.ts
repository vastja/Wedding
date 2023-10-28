import { Component } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';

let animation = trigger('rotate', [
    state('active', style({
      transform: 'rotate({{to}}turn)'  
    }), {
      params: {
        to: 0
      }
    }),
    state('inactive', style({})),
    transition('inactive => active', animate(1000)),
  ])


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  animations: [animation]
})
export class WidgetComponent {

  public state = "inactive";

  public from = 0;
  public to = 0;

  private _turns = 0;

  public set turns(value : number) {
    this.from = this._turns;
    this._turns = value;
    this.to = value;
    this.state = "active";
  };

  public get turns() : number {
    return this._turns;
  }

  public static readonly oneTurn = 0.1;

  public back() : void {
    this.turns += WidgetComponent.oneTurn;
  }

  public forward() : void {
    this.turns -= WidgetComponent.oneTurn;
  }

  public done() {
    this.state = 'inactive';
  }

}
