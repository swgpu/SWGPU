import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { UIDialog } from '@lib/ui_dialog/ui_dialog';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
import { Screen } from '@lib/screen/screen';
import { ScriptMachine } from '@lib/script/script_machine';
// ---------------------------------------------------------------------------------------
import { Player } from './player';
import { UIAvatar } from './ui_avatar';
import { UIBackground } from './ui_background';
// ---------------------------------------------------------------------------------------

class VisualNovelScreen extends Screen {
  constructor() {
    super();
    this.player = new Player();
    this.scriptMachine = new ScriptMachine();
  }

  async onEnter() {
    this.scriptMachine.registerCommand('LOAD_SCRIPT', this.$loadScript.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_DIALOG', this.$uiCreateDialog.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_CHOICES', this.$uiCreateChoices.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_AVATAR', this.$uiCreateAvatar.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_BACKGROUND', this.$uiCreateBackground.bind(this));
    this.scriptMachine.registerCommand('UI_PLAY_AVATAR', this.$uiPlayAvatar.bind(this));
    this.scriptMachine.registerCommand('UI_PLAY_BACKGROUND', this.$uiPlayBackground.bind(this));
    this.scriptMachine.registerCommand('UI_DESTROY_AVATAR', this.$uiDestroyAvatar.bind(this));
    this.scriptMachine.registerCommand('UI_DESTROY_BACKGROUND', this.$uiDestroyBackground.bind(this));
    this.scriptMachine.registerCommand('UI_FADE_IN', this.$uiFadeIn.bind(this));
    this.scriptMachine.registerCommand('UI_FADE_OUT', this.$uiFadeOut.bind(this));

    await this.player.loadFromFile('./templates/visual-novel/player.json');
    await this.$loadScript('./templates/visual-novel/scene00.jsc');
  }

  update(ts) {
    this.scriptMachine.update(ts);
  }

  async $loadScript(path) {
    await this.scriptMachine.loadFromFile(path);
    this.scriptMachine.loadVariantFromData(this.player.getVariant());
    this.scriptMachine.jump('ON_INIT');
    this.scriptMachine.setEnabled(true);
  }

  async $uiCreateDialog(author, text) {
    this.scriptMachine.setEnabled(false);
    let uiDialog = new UIDialog();
    uiDialog.setAuthor(author);
    uiDialog.setText(text);
    uiManager.addWidget(uiDialog);
    uiManager.focus(uiDialog);
    await eventManager.wait(uiDialog, 'E_OK');
    uiManager.removeWidget(uiDialog);
    this.scriptMachine.setEnabled(true);
  }

  async $uiCreateChoices(author, text, choices = []) {
    this.scriptMachine.setEnabled(false);
    let uiDialog = new UIDialog();
    uiDialog.setAuthor(author);
    uiDialog.setText(text);
    uiManager.addWidget(uiDialog);
    await eventManager.wait(uiDialog, 'E_PRINT_FINISHED');

    let uiMenu = new UIMenuText();
    uiManager.addWidget(uiMenu, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:12');
    for (let choice of choices) {
      uiMenu.add(0, choice['Text']);
    }

    uiManager.focus(uiMenu);
    let data = await eventManager.wait(uiMenu, 'E_ITEM_SELECTED');
    uiManager.removeWidget(uiDialog);
    uiManager.removeWidget(uiMenu);
    this.scriptMachine.jump(choices[data.index]['Jumpto']);
    this.scriptMachine.setEnabled(true);
  }

  async $uiCreateAvatar(imageFile, jasFile, animation, isLooped, location, animate) {
    this.scriptMachine.setEnabled(false);
    let uiAvatar = new UIAvatar();
    uiAvatar.changeLocation(location);

    await uiAvatar.loadTexture(imageFile);
    await uiAvatar.loadFromFile(jasFile);

    uiAvatar.animate(animate);
    uiAvatar.play(animation, isLooped);
    uiManager.addWidget(uiAvatar);

    await eventManager.wait(uiAvatar, 'E_ANIMATION_FINISHED');
    this.scriptMachine.setEnabled(true);
  }

  async $uiCreateBackground(imageFile, jasFile, animation, isLooped, animate) {
    this.scriptMachine.setEnabled(false);
    let uiBackground = new UIBackground();

    await uiBackground.loadTexture(imageFile);
    await uiBackground.loadFromFile(jasFile);

    uiBackground.animate(animate);
    uiBackground.play(animation, isLooped);
    uiManager.addWidget(uiBackground);

    await eventManager.wait(uiBackground, 'E_ANIMATION_FINISHED');
    this.scriptMachine.setEnabled(true);
  }

  async $uiDestroyAvatar(avatarIndex, animate) {
    this.scriptMachine.setEnabled(false);
    let widgets = uiManager.getWidgets();
    let uiAvatar = widgets.filter(w => w instanceof UIAvatar).at(avatarIndex);

    uiAvatar.animate(animate);
    await eventManager.wait(uiAvatar, 'E_ANIMATION_FINISHED');
    uiManager.removeWidget(uiAvatar);
    this.scriptMachine.setEnabled(true);
  }

  async $uiDestroyBackground(backgroundIndex, animate) {
    this.scriptMachine.setEnabled(false);
    let widgets = uiManager.getWidgets();
    let uiBackground = widgets.filter(w => w instanceof UIBackground).at(backgroundIndex);

    uiBackground.animate(animate);
    await eventManager.wait(uiBackground, 'E_ANIMATION_FINISHED');
    uiManager.removeWidget(uiBackground);
    this.scriptMachine.setEnabled(true);
  }

  $uiPlayAvatar(avatarIndex, animation, isLooped) {
    let widgets = uiManager.getWidgets();
    let uiAvatars = widgets.filter(w => w instanceof UIAvatar);
    uiAvatars[avatarIndex].play(animation, isLooped);
  }

  $uiPlayBackground(backgroundIndex, animation, isLooped) {
    let widgets = uiManager.getWidgets();
    let uiBackgrounds = widgets.filter(w => w instanceof UIBackground);
    uiBackgrounds[backgroundIndex].play(animation, isLooped);
  }

  async $uiFadeIn(delay, ms, timingFunction) {
    this.scriptMachine.setEnabled(false);
    uiManager.fadeIn(delay, ms, timingFunction, () => this.scriptMachine.setEnabled(true));
  }

  async $uiFadeOut(delay, ms, timingFunction) {
    this.scriptMachine.setEnabled(false);
    uiManager.fadeOut(delay, ms, timingFunction, () => this.scriptMachine.setEnabled(true));
  }
}

export { VisualNovelScreen };