import * as blessed from 'blessed';

import { ComponentPosition, ComponentSize, ComponentPadding } from '../components/component-types';


/** Box Interfaces **/
interface IBoxStyle {
  border: { fg: string },
  focus: { fg: string }
}
interface IBoxBorder {
  type: string;
}
interface IBox {
  parent?: blessed.Widgets.Node;
  label?: string;
  position?: ComponentPosition;
  size?: ComponentSize;
  interactive?: boolean;
  scrollable?: boolean;
  keys?: boolean;
  mouse?: boolean;
  vi?: boolean;
  draggable?: boolean;
  tags?: boolean;
  border?: IBoxBorder;
  style?: IBoxStyle;
  padding?: ComponentPadding;
}


/** Concrete Modal Box **/
class Box implements IBox {
  parent?: blessed.Widgets.Node;
  label?: string;
  position?: ComponentPosition;
  size?: ComponentSize;
  interactive?: boolean;
  scrollable?: boolean;
  keys?: boolean;
  mouse?: boolean;
  vi?: boolean;
  draggable?: boolean;
  tags?: boolean;
  border?: IBoxBorder;
  style?: IBoxStyle;
  padding?: ComponentPadding;

  constructor(box: IBox) {
      Object.assign(this, box);
  }
}


/** Exported Builder **/
export class BoxBuilder implements Partial<Box> {

  /** Required **/
  parent?: blessed.Widgets.Node;
  label?: string;
  position?: ComponentPosition;
  size?: ComponentSize;

  /** Defaults **/
  interactive?: boolean = false;
  scrollable?: boolean = false;
  keys?: boolean = false;
  mouse?: boolean = false;
  vi?: boolean = false;
  draggable?: boolean = false;
  tags?: boolean = false;
  border?: IBoxBorder = {
      type: 'line'
  };
  style?: IBoxStyle = {
      border: { fg: 'black' },
      focus: { fg: 'black' }
  };
  padding?: ComponentPadding = {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
  };


  /** Required **/
  public withParent(parent: blessed.Widgets.Node): this & Required<Pick<Box, 'parent'>> {
    return Object.assign(this, { parent });
  }
  public withLabel(label: string): this & Required<Pick<Box, 'label'>> {
    return Object.assign(this, { label: ` ${label} ` });
  }
  public withPosition(position: ComponentPosition): this & Required<Pick<Box, 'position'>> {
    return Object.assign(this, { position });
  }
  public withSize(size: ComponentSize): this & Required<Pick<Box, 'size'>> {
    return Object.assign(this, { size });
  }

  /** Optional **/
  public withDraggable(isEnabled: boolean = true): this & Pick<Box, 'draggable'> {
      return Object.assign(this, { draggable: isEnabled });
  }
  public withStyle(style: IBoxStyle): this & Pick<Box, 'style'> {
      return Object.assign(this, { style });
  }


  /** Build **/
  public build(): blessed.Widgets.BoxElement {
      let box: any = Object.assign({}, new Box(this));
      let boxParams = { ...box, ...box.position, ...box.size };
      delete boxParams.position;
      delete boxParams.size;
      return blessed.box(<blessed.Widgets.BoxOptions>boxParams);
  }
}
