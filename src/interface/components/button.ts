import * as blessed from 'blessed';

import { ComponentPosition, ComponentSize, ComponentPadding } from './component-types';


/** Button Interfaces **/
interface IButtonStyle {
    bg: string,
    fg: string,
    focus: { fg: string, bg: string },
    hover: { fg: string, bg: string }
}
interface IButton {
  parent?: blessed.Widgets.Node;
  name?: string; //label
  content?: string; //label
  position?: ComponentPosition;
  size?: ComponentSize;
  keys?: boolean;
  mouse?: boolean;
  shrink?: boolean;
  style?: IButtonStyle;
  padding?: ComponentPadding;
};


/** Concrete Log **/
class Button implements IButton {
  parent?: blessed.Widgets.Node;
  name?: string; //label
  content?: string; //label
  position?: ComponentPosition;
  size?: ComponentSize;
  keys?: boolean;
  mouse?: boolean;
  shrink?: boolean;
  style?: IButtonStyle;
  padding?: ComponentPadding;

  constructor(button: IButton) {
      Object.assign(this, button);
  }
}


/** Exported Builder **/
export class ButtonBuilder implements Partial<Button> {

  /** Required **/
  parent: blessed.Widgets.Node;
  name: string; //label
  content: string; //label
  position: ComponentPosition;
  size: ComponentSize;

  /** Defaults **/
  keys?: boolean = false;
  mouse?: boolean = false;
  shrink?: boolean = true;
  style?: IButtonStyle = {
    bg: 'yellow',
    fg: 'white',
    focus: { fg: 'black', bg: 'white' },
    hover: { fg: 'black', bg: 'white' }
  };
  padding?: ComponentPadding = {
    left: 2,
    right: 2,
    top: 1,
    bottom: 1
  };


  /** Required **/
  public withParent(parent: blessed.Widgets.Node): this & Required<Pick<Button, 'parent'>> {
    return Object.assign(this, { parent });
  }
  public withName(name: string): this & Required<Pick<Button, 'name'>> {
    return Object.assign(this, { name, content: name });
  }
  public withPosition(position: ComponentPosition): this & Required<Pick<Button, 'position'>> {
    return Object.assign(this, { position });
  }
  public withSize(size: ComponentSize): this & Required<Pick<Button, 'size'>> {
    return Object.assign(this, { size });
  }

  /** Optional **/
  public withInteractions(isEnabled: boolean = true): this & Pick<Button,
    'keys'|'mouse'>
  {
    return Object.assign(this, {
        keys: isEnabled,
        mouse: isEnabled
    });
  }
  public withStyle(style: IButtonStyle): this & Pick<Button, 'style'> {
    return Object.assign(this, { style });
  }


  /** Build **/
  public build(): blessed.Widgets.ButtonElement {
    let button: any = Object.assign({}, new Button(this));
    let buttonParams = { ...button, ...button.position, ...button.size };
    delete buttonParams.position;
    delete buttonParams.size;
    return blessed.button(<blessed.Widgets.ButtonOptions>buttonParams);
  }
}
