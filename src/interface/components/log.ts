import * as blessed from 'blessed';

import { ComponentPosition, ComponentSize, ComponentPadding } from './component-types';


/** Log Interfaces **/
interface ILogStyle {
    border: { fg: string; };
    focus: { fg: string; };
}
interface ILogBorder {
    type: string;
}
interface ILog {
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
    border?: ILogBorder;
    style?: ILogStyle;
    padding?: ComponentPadding;
}


/** Concrete Log **/
class Log implements ILog {
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
    border?: ILogBorder;
    style?: ILogStyle;
    padding?: ComponentPadding;

    constructor(log: ILog) {
        Object.assign(this, log);
    }
}


/** Exported Builder **/
export class LogBuilder implements Partial<Log> {

    /** Required **/
    parent: blessed.Widgets.Node;
    label: string;
    position: ComponentPosition;
    size: ComponentSize;

    /** Defaults **/
    interactive?: boolean = false;
    scrollable?: boolean = false;
    keys?: boolean = false;
    mouse?: boolean = false;
    vi?: boolean = false;
    draggable?: boolean = false;
    tags?: boolean = false;
    border?: ILogBorder = {
        type: 'line'
    };
    style?: ILogStyle = {
        border: { fg: 'black' },
        focus: { fg: 'black' }
    };
    padding?: ComponentPadding = {
        top: 0,
        right: 1,
        bottom: 0,
        left: 1
    };


    /** Required **/
    public withParent(parent: blessed.Widgets.Node): this & Required<Pick<Log, 'parent'>> {
        return Object.assign(this, { parent });
    }
    public withLabel(label: string): this & Required<Pick<Log, 'label'>> {
        return Object.assign(this, { label: ` ${label} ` });
    }
    public withPosition(position: ComponentPosition): this & Required<Pick<Log, 'position'>> {
        return Object.assign(this, { position });
    }
    public withSize(size: ComponentSize): this & Required<Pick<Log, 'size'>> {
        return Object.assign(this, { size });
    }

    /** Optional **/
    public withInteractions(isEnabled: boolean = true): this & Pick<Log,
        'interactive'|'scrollable'|'keys'|'mouse'|'vi'>
    {
        return Object.assign(this, {
            interactive: isEnabled,
            scrollable: isEnabled,
            keys: isEnabled,
            mouse: isEnabled,
            vi: isEnabled
        });
    }
    public withDraggable(isEnabled: boolean = true): this & Pick<Log, 'draggable'> {
        return Object.assign(this, { draggable: isEnabled });
    }
    public withTags(isEnabled: boolean = true): this & Pick<Log, 'tags'> {
        return Object.assign(this, { tags: isEnabled });
    }
    public withStyle(style: ILogStyle): this & Pick<Log, 'style'> {
        return Object.assign(this, { style });
    }


    /** Build **/
    public build(): blessed.Widgets.Log {
        let log: any = Object.assign({}, new Log(this));
        let logParams = { ...log, ...log.position, ...log.size };
        delete logParams.position;
        delete logParams.size;
        return blessed.log(<blessed.Widgets.LogOptions>logParams);
    }
}
