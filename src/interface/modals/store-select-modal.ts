import { LogBuilder } from './../components/log';
import * as blessed from 'blessed';

// import { FuzzySearch } from '../../utils/fuzzy-search';
import { BaseModal, IBaseModalHandlers } from './base-modal';
import { ComponentPosition, ComponentSize } from './../components/component-types';

/** Component Builders **/
import { BoxBuilder } from './../components/box';
import { ButtonBuilder } from './../components/button';


export interface IStoreSelectModalHandlers extends IBaseModalHandlers {
  keypressHandler: (data: any) => void;
}


export class StoreSelectModal extends BaseModal {
  static readonly modalWidth = 80;
  static readonly modalHeight = 30;

  private _modalForm: blessed.Widgets.FormElement<unknown>;
  private _searchBox: blessed.Widgets.TextElement;
  private _searchResults: any;
  private _infoBox: any;

  constructor(screen: blessed.Widgets.Screen, { keypressHandler, closeHandler }: IStoreSelectModalHandlers) {
    super(screen, <IBaseModalHandlers>{ closeHandler }, StoreSelectModal.modalWidth, StoreSelectModal.modalHeight);

    // let fuzzySearch = new FuzzySearch();

    this._modalForm = this.createModalForm(this._modalBox);
    this._searchBox = this.createTextBox(this._modalForm,
      'Shopify Store',
      <ComponentPosition>{ top: 0 }
    );
    this._searchBox.key('enter', () => {
      searchButton.focus();
      this.screen.render();
    });

    this._searchResults = new LogBuilder()
      .withParent(this._modalForm)
      .withPosition({ top: 3 })
      .withSize({ height: 3 })
      .build();

    this._infoBox = new BoxBuilder()
      .withParent(this._modalForm)
      .withLabel('Info')
      .withPosition({ bottom: 5 })
      .withSize({ height: 16 })
      .build();

    let searchButton = new ButtonBuilder()
      .withParent(this._modalForm)
      .withName('SEARCH')
      .withPosition({ bottom: 1, left: 0 })
      .withSize({ width: '50%-3' })
      .withInteractions()
      .build();

    let cancelButton = new ButtonBuilder()
      .withParent(this._modalForm)
      .withName('CANCEL')
      .withPosition({ bottom: 1, right: 0 })
      .withSize({ width: '50%-3' })
      .withInteractions()
      .build();



    searchButton.on('press', () => this.destroyModal({
      [this._searchBox.name]: this._searchBox.content,
    }));

    cancelButton.on('press', () => this.destroyModal({
      [this._searchBox.name]: this._searchBox.content,
    }));


    /* Search Box Handlers */

    const bindHandlers = (
      keyPressHandler: (data: any) => any,
      deleteHandler: (data: any) => any,
      enterHandler: (data: any) => any) => {
        this._searchBox.key('backspace', deleteHandler);
        this._searchBox.key('enter', enterHandler);
        this._searchBox.on('keypress', keyPressHandler);
    }

    const logSearchResults = (results: any) => {
      this._searchResults.setText('');
      results = results.map((r: any) => r.website);
      for (let result of results) this._searchResults.log(result);
      this.screen.render();
    }

    bindHandlers(
      (event) => { // keyPressHandler
        // let results = fuzzySearch.search(this._searchBox.content + event);
        keypressHandler(this._searchBox.content + event);
        // logSearchResults(results);
        this._infoBox.setContent(this._searchBox.content + event);
      },
      (_) => { // deleteHandler
        // let results = fuzzySearch.search(this._searchBox.content);
        keypressHandler(this._searchBox.content);
        // logSearchResults(results);
        this._infoBox.setContent(this._searchBox.content);
      },
      (_) => { // enterHandler
        // let results = fuzzySearch.search(this._searchBox.content);
        // keypressHandler(this._searchBox.content);
        // searchButton.focus();
        // logSearchResults(results);
      }
    );

    this._searchBox.focus();
    this.screen.render();
  }
}
