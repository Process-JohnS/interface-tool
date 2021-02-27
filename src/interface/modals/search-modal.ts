import * as blessed from 'blessed';

import { ComponentPosition, ComponentSize } from './../components/component-types';
import { BaseModal, IBaseModalHandlers } from './base-modal';
import { LogBuilder } from './../components/log';


export interface ISearchModalHandlers extends IBaseModalHandlers {
  keypressHandler: (data: any) => void;
}


export class SearchModal extends BaseModal {

    /** SearchModal Dimensions **/
    static readonly MODAL_WIDTH = 50;
    static readonly MODAL_HEIGHT = 11;

    /** Private Components **/
    private _modalForm: blessed.Widgets.FormElement<unknown>;
    private _searchBox: blessed.Widgets.TextElement;

    private _log: blessed.Widgets.Log;


    constructor(screen: blessed.Widgets.Screen, { keypressHandler, closeHandler }: ISearchModalHandlers) {

        /** Initialize the base modal **/
        super(screen,
            <IBaseModalHandlers>{ closeHandler },
            SearchModal.MODAL_WIDTH,
            SearchModal.MODAL_HEIGHT
        );

        /** Modal Form **/
        this._modalForm = this.createModalForm(this._modalBox);

        /** Log **/
        this._log = new LogBuilder()
            .withLabel('Log')
            .withParent(this._modalForm)
            .withPosition({ top: 0 })
            .withSize({ width: this.modalContentWidth, height: 3 })
            .build();

        /** Search Box **/
        // this._searchBox = this.createTextBox(this._modalForm, 'Shopify Store', <ComponentPosition>{ top: 0 });
        // this._searchBox.key('enter', () => {
        //     searchButton.focus();
        //     this.screen.render();
        // });

        /** Search Box Handlers **/
        const bindHandlers = (
            /** Handler Params **/
            keyPressHandler: (data: any) => any,
            deleteHandler: (data: any) => any,
            enterHandler: (data: any) => any
        ) => {
            // this._searchBox.key('backspace', deleteHandler);
            // this._searchBox.key('enter', enterHandler);
            // this._searchBox.on('keypress', keyPressHandler);
        }
        bindHandlers(
            /** keyPressHandler **/
            (event) => {
                keypressHandler(event);
                this.screen.render();
            },
            /** deleteHandler **/
            (_) => {
                this.screen.render();
            },
            /** enterHandler **/
            (_) => {
                searchButton.focus();
                this.screen.render();
            }
        );

        /** Search Button **/
        let searchButton = this.createFormButton(this._modalForm,
            'SEARCH',
            <ComponentPosition>{ bottom: 1, left: 0 },
            <ComponentSize>{ width: '50%-1' }
        );
        /** Return { 'Shopify Store': '[result]' } **/
        searchButton.on('press', () => this.destroyModal({
            // [this._searchBox.name]: this._searchBox.content
        }));

        // this._searchBox.focus();
        this._log.focus();
        this.screen.render();
    }

}
