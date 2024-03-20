import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { Screen } from '../../lib/screen/screen';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { ViewerScreen } from '../viewer/viewer_screen';
import { UserInterfaceScreen } from '../user-interface/user_interface_screen';
import { PrerenderedScreen } from '../prerendered/prerendered_screen';
import { IsoScreen } from '../iso/iso_screen';
import { TilemapScreen } from '../tilemap/tilemap_screen';
import { TilemapPathfindingScreen } from '../tilemap-pathfinding/tilemap_pathfinding_screen';
import { VisualNovelScreen } from '../visual-novel/visual_novel_screen';
import { BoardScreen } from '../board/board_screen';
import { CCGScreen } from '../ccg/ccg_screen';
import { FPSScreen } from '../fps/fps_screen';
import { RPGScreen } from '../rpg/rpg_screen';
import { PerfScreen } from '../perf/perf_screen';
import { ParticlesScreen } from '../particles/particles_screen';
import { FightScreen } from '../fight/fight_screen';
import { CurveScreen } from '../curve/curve_screen';
import { TripleTriadScreen } from '../triple-triad/triple_triad_screen';
import { TilemapIsoScreen } from '../tilemap-iso/tilemap_iso_screen';
import { ShadowScreen } from '../shadow/shadow_screen';
import { BgIsoScreen } from '../bg-iso/bg_iso_screen';
// ---------------------------------------------------------------------------------------

class BootScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
  }

  async onEnter() {
    this.uiMenu.add('0', '3D Viewer');
    this.uiMenu.add('1', 'UI Menu');
    this.uiMenu.add('2', '3D Pre-rendered Demo');
    this.uiMenu.add('3', '3D Iso Demo');
    this.uiMenu.add('4', '2D Visual Novel Demo');
    this.uiMenu.add('5', '2D Tilemap Demo');
    this.uiMenu.add('6', '2D Tilemap Pathfinding Demo');
    this.uiMenu.add('7', '2D Board Demo');
    this.uiMenu.add('8', '2D CCG Demo');
    this.uiMenu.add('9', '3D FPS Demo');
    this.uiMenu.add('10', '3D RPG Demo');
    this.uiMenu.add('11', '3D Perf Demo');
    this.uiMenu.add('12', '3D Particles Demo');
    this.uiMenu.add('13', '2D Fighting Demo');
    this.uiMenu.add('14', '3D Curve Demo');
    this.uiMenu.add('15', '2D Triple Triad Demo');
    this.uiMenu.add('16', '2D Tilemap Iso Demo');
    this.uiMenu.add('17', '3D Shadow Map Demo');
    this.uiMenu.add('18', '2D Background Iso');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.removeWidget(this.uiMenu);
  }

  handleMenuItemSelected(data) {
    if (data.id == 0) {
      screenManager.requestSetScreen(new ViewerScreen());
    }
    else if (data.id == 1) {
      screenManager.requestSetScreen(new UserInterfaceScreen());
    }
    else if (data.id == 2) {
      screenManager.requestSetScreen(new PrerenderedScreen());
    }
    else if (data.id == 3) {
      screenManager.requestSetScreen(new IsoScreen());
    }
    else if (data.id == 4) {
      screenManager.requestSetScreen(new VisualNovelScreen());
    }
    else if (data.id == 5) {
      screenManager.requestSetScreen(new TilemapScreen());
    }
    else if (data.id == 6) {
      screenManager.requestSetScreen(new TilemapPathfindingScreen());
    }
    else if (data.id == 7) {
      screenManager.requestSetScreen(new BoardScreen());
    }
    else if (data.id == 8) {
      screenManager.requestSetScreen(new CCGScreen(), { duelId: '0000' });
    }
    else if (data.id == 9) {
      screenManager.requestSetScreen(new FPSScreen());
    }
    else if (data.id == 10) {
      screenManager.requestSetScreen(new RPGScreen());
    }
    else if (data.id == 11) {
      screenManager.requestSetScreen(new PerfScreen());
    }
    else if (data.id == 12) {
      screenManager.requestSetScreen(new ParticlesScreen());
    }
    else if (data.id == 13) {
      screenManager.requestSetScreen(new FightScreen());
    }
    else if (data.id == 14) {
      screenManager.requestSetScreen(new CurveScreen());
    }
    else if (data.id == 15) {
      screenManager.requestSetScreen(new TripleTriadScreen());
    }
    else if (data.id == 16) {
      screenManager.requestSetScreen(new TilemapIsoScreen());
    }
    else if (data.id == 17) {
      screenManager.requestSetScreen(new ShadowScreen());
    }
    else if (data.id == 18) {
      screenManager.requestSetScreen(new BgIsoScreen());
    }
  }
}

export { BootScreen };