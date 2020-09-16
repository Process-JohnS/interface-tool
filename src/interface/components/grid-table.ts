import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';

import { GridPosition, TableColumnWidths } from './grid-types';


/** GridTable Interfaces **/
interface IGridTableStyle {
    border: {
        type: string;
        fg: string;
    }
}
interface IGridTable {
    label?: string;
    gridPosition?: GridPosition;
    columnWidth?: TableColumnWidths;
    columnSpacing?: number;
    interactive?: boolean;
    scrollBar?: boolean;
    keys?: boolean;
    mouse?: boolean;
    vi?: boolean;
    draggable?: boolean;
    tags?: boolean;
    fg?: string;
    selectedFg?: string;
    selectedBg?: string;
    style?: IGridTableStyle;
}


/** Concrete Log **/
class GridTable implements IGridTable {
    label?: string;
    gridPosition?: GridPosition;
    columnWidth?: TableColumnWidths;
    columnSpacing?: number;
    interactive?: boolean;
    scrollBar?: boolean;
    keys?: boolean;
    mouse?: boolean;
    vi?: boolean;
    draggable?: boolean;
    tags?: boolean;
    fg?: string;
    selectedFg?: string;
    selectedBg?: string;
    style?: IGridTableStyle;

    constructor(gridTable: IGridTable) {
        Object.assign(this, gridTable);
    }
}


/** Exported Builder Class **/
export class GridTableBuilder implements Partial<GridTable> {

    /** Required **/
    label: string;
    gridPosition: GridPosition;
    columnWidth: TableColumnWidths;

    /** Defaults **/
    columnSpacing?: number = 1;
    interactive?: boolean = false;
    scrollBar?: boolean = false;
    keys?: boolean = false;
    mouse?: boolean = false;
    vi?: boolean = false;
    draggable?: boolean;
    tags?: boolean = true;
    fg?: string = 'white';
    selectedFg?: string = 'black';
    selectedBg?: string = 'cyan';
    style?: IGridTableStyle = {
        border: {
            type: 'line',
            fg: 'cyan'
        }
    };


    /** Required **/
    public withLabel(label: string): this & Required<Pick<GridTable, 'label'>> {
        return Object.assign(this, { label: ` {white-fg}${label}{/white-fg} ` });
    }
    public withPosition(gridPosition: GridPosition): this & Required<Pick<GridTable, 'gridPosition'>> {
        return Object.assign(this, { gridPosition: gridPosition });
    }
    public withColumnWidths(columnWidth: TableColumnWidths): this & Required<Pick<GridTable, 'columnWidth'>> {
        return Object.assign(this, { columnWidth });
    }

    /** Optional **/
    public withInteractions(isEnabled: boolean = true): this & Pick<GridTable,
        'interactive'|'scrollBar'|'keys'|'mouse'|'vi'>
    {
        return Object.assign(this, {
            interactive: isEnabled,
            scrollBar: isEnabled,
            keys: isEnabled,
            mouse: isEnabled,
            vi: isEnabled
        });
    }
    public withDraggable(isEnabled: boolean = true): this & Pick<GridTable, 'draggable'> {
        return Object.assign(this, { draggable: isEnabled });
    }
    public withTags(isEnabled: boolean = true): this & Pick<GridTable, 'tags'> {
        return Object.assign(this, { tags: isEnabled });
    }
    public withStyle(style: IGridTableStyle): this & Pick<GridTable, 'style'> {
        return Object.assign(this, { style });
    }


    /** Build **/
    public build(this: GridTable, grid: contrib.grid): contrib.Widgets.PictureElement {
        const gridTableParams: Omit<GridTable, 'gridPosition'> = this;
        let gridTable = Object.assign({}, new GridTable(this));
        return grid.set(...gridTable.gridPosition, contrib.table, {...gridTableParams});
    }
}
