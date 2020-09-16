import * as blessed from 'blessed';
import * as contrib from 'blessed-contrib';


export class UI {
    protected _screen: blessed.Widgets.Screen;
    protected _grid: contrib.grid;

    protected static createScreen(title: string): blessed.Widgets.Screen {
        return blessed.screen({
            title,
            dockBorders: true,
            smartCSR: true,
            cursor: {
                artificial: true,
                shape: 'line',
                blink: true,
                color: 'white'
            }
        });
    }

    protected static createGrid(screen: blessed.Widgets.Screen): contrib.grid {
        return new contrib.grid({ screen, rows: 12, cols: 12 });
    }

    constructor(title: string) {
        this._screen = UI.createScreen(title);
        this._grid = UI.createGrid(this._screen);
        this._screen.key(['escape' , 'q'], function() {
            this.destroy();
        });
        this._screen.render();
    }

}
