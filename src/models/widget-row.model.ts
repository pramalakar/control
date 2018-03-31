import {Widget} from './widget.model';
/**
 * Created by Prakash Malakar on 30/03/2018.
 */
export class WidgetRow {
  constructor (public id: number,
               public title: string,
               public order: number,
               public layoutId: number,
               public widget: Widget
  ) {}
}
