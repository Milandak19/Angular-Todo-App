import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import {createSingleton} from 'tippy.js'
import { ToolTipDirective } from './tool-tip.directive';

@Directive({
  selector: '[appToolTipSingleton]'
})
export class ToolTipSingletonDirective implements AfterViewInit {

  @ContentChildren(ToolTipDirective, {descendants: true}) elementWithTooltips: QueryList<ToolTipDirective>

  singletonInstance: any;

  constructor() { }

  ngAfterViewInit() {

    this.singletonInstance = createSingleton(this.getTippyInstance(), {
      delay: [200, 0],
      moveTransition: 'transform 0.2s ease-out'
    })

    this.elementWithTooltips.changes.subscribe(() => {
      this.singletonInstance.setInstances(this.getTippyInstance())
    })
  }

  getTippyInstance() {
    return this.elementWithTooltips.toArray().map(t => t.tippyInstance)
  }

}
