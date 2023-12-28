import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent} from '@angular/animations';

let animation = trigger('rotate', [
    state('*', style({
      transform: 'rotate(0.2858turn)'
    })),
    state('active', style({
      transform: 'rotate({{to}}turn)'  
    }), {
      params: {
        to: 0
      }
    }),
    state('inactive', style({})),
    transition('inactive => active', animate(1000)),
    transition('* => active', animate(1000)),
  ])


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  animations: [animation]
})
export class WidgetComponent {

  public state = "";

  public from = 0;
  public to = 0;

  private _turns = 2 * WidgetComponent.oneTurn;

  public set turns(value : number) {
    this.from = this._turns;
    this._turns = value;
    this.to = value;
    this.state = "active";
  };

  public get turns() : number {
    return this._turns;
  }

  public static readonly oneTurn = 0.1429;

  public back() : void {
    console.log(this.state);
    if (this._isReady()) {
      this.turns += WidgetComponent.oneTurn;
    }
  }

  public forward() : void {
    if (this._isReady()) {
      this.turns -= WidgetComponent.oneTurn;
    }
  }

  public done(event: AnimationEvent) {
    if (event.fromState != 'void') {
      this.state = 'inactive';
    }
  }

  private _isReady() : boolean {
    return this.state === 'inactive' || this.state === '';
  }

}
