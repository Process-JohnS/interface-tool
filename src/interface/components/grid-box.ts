import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';

import { GridPosition, TableColumnWidths } from './grid-types';


/** Grid Box Interfaces **/
interface IGridBoxStyle {
    border: { fg: string; };
    scrollBar: { bg: string };
}
interface IGridBox {
    label?: string;
    gridPosition?: GridPosition;
    interactive?: boolean;
    scrollable?: boolean;
    scrollBar?: boolean;
    keys?: boolean;
    mouse?: boolean;
    vi?: boolean;
    draggable?: boolean;
    tags?: boolean;
    fg?: string;
    padding?: number;
    style?: IGridBoxStyle;
}


/** Concrete Grid Box **/
class GridBox implements IGridBox {
    label?: string;
    gridPosition?: GridPosition;
    interactive?: boolean;
    scrollable?: boolean;
    scrollBar?: boolean;
    keys?: boolean;
    mouse?: boolean;
    vi?: boolean;
    draggable?: boolean;
    tags?: boolean;
    fg?: string;
    padding?: number;
    style?: IGridBoxStyle;

    constructor(gridBox: IGridBox) {
        Object.assign(this, gridBox);
    }
}


/** Exported Builder Class **/
export class GridBoxBuilder implements Partial<GridBox> {

    /** Required **/
    label: string;
    gridPosition: GridPosition;

    /** Defaults **/
    interactive?: boolean = false;
    scrollable?: boolean = false;
    scrollBar?: boolean = false;
    keys?: boolean = false;
    mouse?: boolean = false;
    vi?: boolean = false;
    draggable?: boolean = false;
    tags?: boolean = false;
    fg?: string = 'white';
    padding?: number = 0;
    style?: IGridBoxStyle = {
        border: { fg: 'yellow' },
        scrollBar: { bg: 'yellow' }
    };


    /** Required **/
    public withLabel(label: string): this & Required<Pick<GridBox, 'label'>> {
        return Object.assign(this, { label: ` ${label} ` });
    }
    public withPosition(gridPosition: GridPosition): this & Required<Pick<GridBox, 'gridPosition'>> {
        return Object.assign(this, { gridPosition: gridPosition });
    }

    /** Optional **/
    public withInteractions(isEnabled: boolean = true): this & Pick<GridBox,
        'interactive'|'scrollable'|'scrollBar'|'keys'|'mouse'|'vi'>
    {
        return Object.assign(this, {
            interactive: isEnabled,
            scrollable: isEnabled,
            scrollBar: isEnabled,
            keys: isEnabled,
            mouse: isEnabled,
            vi: isEnabled
        });
    }
    public withDraggable(isEnabled: boolean = true): this & Pick<GridBox, 'draggable'> {
        return Object.assign(this, { draggable: isEnabled });
    }
    public withTags(isEnabled: boolean = true): this & Pick<GridBox, 'tags'> {
        return Object.assign(this, { tags: isEnabled });
    }
    public withStyle(style: IGridBoxStyle): this & Pick<GridBox, 'style'> {
        return Object.assign(this, { style: style });
    }


    /** Build **/
    public build(this: GridBox, grid: contrib.grid): blessed.Widgets.BoxElement {
        const gridBoxParams: Omit<GridBox, 'gridPosition'> = this;
        let gridBox = Object.assign({}, new GridBox(this));
        return grid.set(...gridBox.gridPosition, blessed.box, {...gridBoxParams});
    }
}
