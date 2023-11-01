import { uiManager } from '../../../lib/ui/ui_manager';
import { screenManager } from "../../../lib/screen/screen_manager";
import { eventManager } from '../../../lib/core/event_manager';
import { Screen } from '../../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { Card } from '../core/card';
import { UICardMenu } from './ui_card_menu';
import { UIPlayerHand } from './ui_player_hand';
import { UICard } from '../ui/ui_card';
import { UICardDescription } from './ui_card_description';
import { UICardMenuItem } from './ui_card_menu_item';
import { TripleTriadScreen } from "../triple_triad_screen";

class CardSelectionScreen extends Screen {
  uiCardMenuTitle: HTMLElement;
  uiPlayerHandTitle: HTMLElement;
  uiPlayerHand: UIPlayerHand;
  uiCardMenu: UICardMenu;
  uiCardDescriptionTitle: HTMLElement;
  uiCardDescription: UICardDescription;
  hand: Array<Card>;
  selectedCards: Array<Card>;
  databaseCards: Array<Card>;
  maxCards: number;

  constructor(maxCards: number = 8) {
    super();
    this.uiCardMenuTitle = CREATE_CARD_MENU_TITLE();
    this.uiPlayerHandTitle = CREATE_TITLE('Aperçu de vos cartes');
    this.uiPlayerHand = new UIPlayerHand();
    this.uiCardMenu = new UICardMenu({ multiple: true });
    this.uiCardDescriptionTitle = CREATE_TITLE('Aperçu de la carte');
    this.uiCardDescription = new UICardDescription();
    this.hand = [];
    this.selectedCards = [];
    this.databaseCards = [];
    this.maxCards = maxCards;
  }

  async onEnter(): Promise<void> {
    uiManager.addNode(this.uiCardMenuTitle, 'position:absolute; top:50%; left:50%; width:50%; height:46px;');
    uiManager.addNode(this.uiPlayerHandTitle, 'position: absolute; top:0; left:0; width:50%; height:46px;');
    uiManager.addWidget(this.uiPlayerHand, 'position:absolute; top:46px; bottom:0; left:0; width:50%;');
    uiManager.addWidget(this.uiCardMenu, 'position:absolute; top:calc(50% + 46px); bottom:0; left:50%; width:50%;');
    uiManager.addNode(this.uiCardDescriptionTitle, 'position: absolute; top:0; left:50%; width:50%; height:46px;');
    uiManager.addWidget(this.uiCardDescription, 'position:absolute; top:46px; left:50%; width:50%; height:calc(50% - 46px);');

    this.initCardsDatabase();
    this.initCardMenu();

    eventManager.subscribe(this.uiCardMenu, 'E_ITEM_FOCUSED', this, this.handleCardMenuItemFocused);
    eventManager.subscribe(this.uiCardMenu, 'E_ITEM_REMOVED', this, this.handleCardMenuRemoved);
    eventManager.subscribe(this.uiCardMenu, 'E_ITEM_ADDED', this, this.handleCardMenuItemAdded);
    eventManager.subscribe(this.uiCardMenu, 'E_MAX_CARDS_SELECTED', this, this.handleMaxCardsSelected);
    uiManager.focus(this.uiCardMenu);
  }

  onExit(): void {
    uiManager.removeWidget(this.uiCardMenu);
  }

  initCardsDatabase(): void {
    const cardNames = ["Alice", "Patchouli", "Cirno", "Reimu", "Sakuya", "Remilia", "Meiling", "Reisen", "Mokou", "Iku", "Kisume", "Kogasa", "Komachi", "Marisa", "Konngara", "Momiji"];

    for (const name of cardNames) {
      const card = new Card();
      card.setPoints(Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1), Math.floor(Math.random() * 10 + 1));
      card.setName(name);
      this.databaseCards.push(card);
    }
  }

  initCardMenu(): void {
    for (const card of this.databaseCards) {
      const menuItem = new UICardMenuItem(card.name, 5);
      this.uiCardMenu.addWidget(menuItem);
    }
  }

  handleCardMenuItemFocused(data: any): void {
    this.uiCardDescription.setCard(this.databaseCards[data.index]);
  }

  handleCardMenuItemAdded(data: any): void {
    const item = this.uiCardMenu.getWidget(data.index) as UICardMenuItem;
    if (item.getQuantity() <= 0) {
      return;
    }

    const uiCard = new UICard();
    uiCard.setCard(this.databaseCards[data.index]);
    uiCard.appendStyles('height:110px; margin-bottom:10px');
    this.uiPlayerHand.appendChild(uiCard.getNode());

    item.add();
    this.selectedCards.push(this.databaseCards[data.index]);

    if (this.selectedCards.length >= this.maxCards)
    {
      eventManager.emit(this.uiCardMenu, 'E_MAX_CARDS_SELECTED', {});
      this.uiCardMenu.unfocus();
      return;
    }
  }

  handleCardMenuRemoved(data: any): void {
    const item = this.uiCardMenu.getWidget(data.index) as UICardMenuItem;
    const selectedCardIndex = this.selectedCards.findIndex(card => card.getName() == item.getName());
    if (selectedCardIndex == -1) {
      return;
    }

    this.uiPlayerHand.removeChild(selectedCardIndex);

    item.remove();
    this.selectedCards.splice(selectedCardIndex, 1);
  }

  handleMaxCardsSelected(data: any): void
  {
    console.log("maximum de cartes à sélectionner atteint !");
    screenManager.requestSetScreen(new TripleTriadScreen());
  }

  getCardsSelected(): Array<Card>
  {
    return this.selectedCards;
  }
}

export { CardSelectionScreen };

function CREATE_TITLE(label: string): HTMLDivElement  {
  const title = document.createElement('div');
  title.className = 'CardSelectionScreen-title';
  const text = document.createElement('div');
  text.textContent = label;
  title.appendChild(text);
  return title;
}

function CREATE_CARD_MENU_TITLE(): HTMLDivElement  {
  const title = document.createElement('div');
  title.style.display = 'flex';
  title.style.justifyContent = 'space-between';
  title.style.alignItems = 'center';
  title.style.paddingLeft = '10px';
  title.style.paddingRight = '10px';
  const labelEl = document.createElement('div');
  labelEl.textContent = 'Nom';
  title.appendChild(labelEl);
  const quantityEl = document.createElement('div');
  quantityEl.textContent = 'Quantity';
  title.appendChild(quantityEl);
  return title;
}