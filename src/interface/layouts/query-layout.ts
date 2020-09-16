import { GridBoxBuilder } from './../components/grid-box';
import { GridTableBuilder } from './../components/grid-table';

import { UI } from './../ui';
import { ISearchModalHandlers, SearchModal } from './../modals/search-modal';


export class QueryLayout extends UI {

    constructor(title: string) {
        super(title);

        /** Box **/
        let box1 = new GridBoxBuilder()
            .withLabel('Summary')
            .withPosition([0, 0, 6, 6])
            .withInteractions()
            .withDraggable(false)
            .build(this._grid);

        /** Table **/
        let table1 = new GridTableBuilder()
            .withLabel('Table')
            .withPosition([6, 0, 6, 6])
            .withColumnWidths([20, 20, 10])
            .withInteractions()
            .withDraggable(false)
            .build(this._grid);


        box1.setContent('hello there');

        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push([`Line: ${i}`, `${i % 4 ? true : false}`, 'test']);
        }
        table1.setData({ headers: ['Info', 'Status', 'Three'], data });

        /** Focus Events **/
        this._screen.key(['C-up'], () => {
            box1.focus();
        });
        this._screen.key('C-down', () => {
            table1.focus();
        });
        box1.on('focus', () => {
            box1.style.border.fg = 'white';
            table1.style.border.fg = 'cyan';
        });
        table1.on('element focus', (row) => {
            table1.style.border.fg = 'white';
            box1.style.border.fg = 'cyan';
        });

        /** Modals **/
        this._screen.key(['k'], () => new SearchModal(this._screen,
            <ISearchModalHandlers>{

                keypressHandler: (data: any) => {
                    box1.setContent(``);
                    box1.setScroll(0);
                    box1.setContent(data);
                },

                closeHandler: (data: any) => {
                    box1.setContent(``);
                    box1.setScroll(0);
                    box1.setContent(data['Shopify Store']);
                }

            }
        ));
    }

}
