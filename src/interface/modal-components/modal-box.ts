import * as blessed from 'blessed';

import { ComponentPosition, ComponentSize } from '../components/component-types';


/** Modal Box Interfaces **/
interface IModalBoxStyle {
  border: { fg: string }
}
interface IModalBox {
  parent?: blessed.Widgets.Node;
  layout?: string;
  position?: ComponentPosition;
  size?: ComponentSize;
  border?: string;
  draggable?: boolean;
  style?: IModalBoxStyle;
}


/** Concrete Modal Box **/
class ModalBox implements IModalBox {
    parent?: blessed.Widgets.Node;
    layout?: string;
    position?: ComponentPosition;
    size?: ComponentSize;
    border?: string;
    draggable?: boolean;
    style?: IModalBoxStyle;

    constructor(modalBox: IModalBox) {
        Object.assign(this, modalBox);
    }
}


/** Exported Builder **/
export class ModalBoxBuilder implements Partial<ModalBox> {

    /** Required **/
    parent: blessed.Widgets.Node;
    position: ComponentPosition;
    size: ComponentSize;

    /** Defaults **/
    layout?: string = 'inline';
    border?: string = 'line';
    draggable?: boolean = false;
    style?: IModalBoxStyle = {
        border: { fg: 'yellow' }
    };


    /** Required **/
    public withParent(parent: blessed.Widgets.Node): this & Required<Pick<ModalBox, 'parent'>> {
        return Object.assign(this, { parent });
    }
    public withPosition(position: ComponentPosition): this & Required<Pick<ModalBox, 'position'>> {
        return Object.assign(this, { position });
    }
    public withSize(size: ComponentSize): this & Required<Pick<ModalBox, 'size'>> {
        return Object.assign(this, { size });
    }

    /** Optional **/
    public withDraggable(isEnabled: boolean = true): this & Pick<ModalBox, 'draggable'> {
        return Object.assign(this, { draggable: isEnabled });
    }
    public withStyle(style: IModalBoxStyle): this & Pick<ModalBox, 'style'> {
        return Object.assign(this, { style });
    }


    /** Build **/
    public build(): blessed.Widgets.LayoutElement {
        let modalBox: any = Object.assign({}, new ModalBox(this));
        let modalBoxParams = { ...modalBox, ...modalBox.position, ...modalBox.size };
        delete modalBoxParams.position;
        delete modalBoxParams.size;
        return blessed.layout(<blessed.Widgets.LayoutOptions>modalBoxParams);
    }
}
