import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { Screen } from '@lib/screen/screen';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { BgIsoScreen } from './templates/bg-iso/bg_iso_screen';
import { BoardScreen } from './templates/board/board_screen';
import { FightScreen } from './templates/fight/fight_screen';
import { FPSScreen } from './templates/fps/fps_screen';
import { IsoScreen } from './templates/iso/iso_screen';
import { PlatformerScreen } from './templates/platformer/platformer_screen';
import { PrerenderedScreen } from './templates/prerendered/prerendered_screen';
import { RPGScreen } from './templates/rpg/rpg_screen';
import { ShootemupScreen } from './templates/shootemup/shootemup_screen';
import { TCGScreen } from './templates/tcg/tcg_screen';
import { ThirdPersonScreen } from './templates/third-person/third_person_screen';
import { TilemapScreen } from './templates/tilemap/tilemap_screen';
import { TilemapIsoScreen } from './templates/tilemap-iso/tilemap_iso_screen';
import { TilemapPathfindingScreen } from './templates/tilemap-pathfinding/tilemap_pathfinding_screen';
import { TripleTriadScreen } from './templates/triple-triad/triple_triad_screen';
import { VisualNovelScreen } from './templates/visual-novel/visual_novel_screen';
import { PhysicsJoltScreen } from './templates/physics-jolt/physics_jolt_screen';
import { PhysicsBox2DScreen } from './templates/physics-box2d/physics_box2d_screen';
// ---------------------------------------------------------------------------------------
import { CurveScreen } from './utils/curve/curve_screen';
import { MenuRingScreen } from './utils/menu-ring/menu_ring_screen';
import { ParticlesScreen } from './utils/particles/particles_screen';
import { PerfScreen } from './utils/perf/perf_screen';
import { ShadowScreen } from './utils/shadow/shadow_screen';
import { UserInterfaceScreen } from './utils/user-interface/user_interface_screen';
import { ViewerScreen } from './utils/viewer/viewer_screen';
import { PackScreen } from './utils/pack/pack_screen';
// ---------------------------------------------------------------------------------------
import { SokobanScreen } from './ai/sokoban/sokoban_screen';
import { CanChaseScreen } from './ai/can-chase/can_chase_screen';

class BootScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
    this.uiTemplates = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
    this.uiUtils = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
    this.uiIAs = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
  }

  async onEnter() {
    this.uiMenu.add('0', 'Templates');
    this.uiMenu.add('1', 'Utils');
    this.uiMenu.add('2', 'IAs');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    this.uiTemplates.add('0', '2D Background Isometric');
    this.uiTemplates.add('1', '2D Checker');
    this.uiTemplates.add('2', '2D Fight');
    this.uiTemplates.add('3', '3D FPS');
    this.uiTemplates.add('4', '3D Isometric');
    this.uiTemplates.add('5', '3D Pre-rendered Paint');
    this.uiTemplates.add('6', '3D RPG');
    this.uiTemplates.add('7', '2D Shootem\'up');
    this.uiTemplates.add('8', '2D TCG');
    this.uiTemplates.add('9', '3D Third Person');
    this.uiTemplates.add('10', '2D Tilemap');
    this.uiTemplates.add('11', '2D Tilemap Isometric');
    this.uiTemplates.add('12', '2D Tilemap Pathfinding');
    this.uiTemplates.add('13', '2D Triple Triad');
    this.uiTemplates.add('14', '2D Visual Novel');
    this.uiTemplates.add('15', '2D Platformer');
    this.uiTemplates.add('16', '3D Physics With Jolt');
    this.uiTemplates.add('17', '2D Physics With Box2D');
    this.uiTemplates.add('18', '3D Pre-rendered ZBuffer');
    this.uiTemplates.setVisible(false);
    uiManager.addWidget(this.uiTemplates, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    this.uiUtils.add('0', '3D Curve');
    this.uiUtils.add('1', '3D Particles');
    this.uiUtils.add('2', '3D Perf');
    this.uiUtils.add('3', '3D Shadow Map');
    this.uiUtils.add('4', 'UI Menu');
    this.uiUtils.add('5', '3D Viewer');
    this.uiUtils.add('6', '3D Menu Ring');
    this.uiUtils.add('7', '3D Pack');
    this.uiUtils.setVisible(false);
    uiManager.addWidget(this.uiUtils, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    this.uiIAs.add('0', '2D Sokoban');
    this.uiIAs.add('1', '3D Can Chase');
    this.uiIAs.setVisible(false);
    uiManager.addWidget(this.uiIAs, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    eventManager.subscribe(this.uiTemplates, 'E_ITEM_SELECTED', this, this.handleTemplateSelected);
    eventManager.subscribe(this.uiUtils, 'E_ITEM_SELECTED', this, this.handleUtilSelected);
    eventManager.subscribe(this.uiIAs, 'E_ITEM_SELECTED', this, this.handleIASelected);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.removeWidget(this.uiMenu);
    uiManager.removeWidget(this.uiTemplates);
    uiManager.removeWidget(this.uiUtils);
    uiManager.removeWidget(this.uiIAs);
  }

  handleMenuItemSelected(data) {
    this.uiMenu.setVisible(false);

    if (data.id == 0) {
      this.uiTemplates.setVisible(true);
      uiManager.focus(this.uiTemplates);
    }
    else if (data.id == 1) {
      this.uiUtils.setVisible(true);
      uiManager.focus(this.uiUtils);
    }
    else if (data.id == 2) {
      this.uiIAs.setVisible(true);
      uiManager.focus(this.uiIAs);
    }
  }

  handleTemplateSelected(data) {
    switch (data.id) {
      case '0':
        screenManager.requestSetScreen(new BgIsoScreen());
        break;
      case '1':
        screenManager.requestSetScreen(new BoardScreen());
        break;
      case '2':
        screenManager.requestSetScreen(new FightScreen());
        break;
      case '3':
        screenManager.requestSetScreen(new FPSScreen());
        break;
      case '4':
        screenManager.requestSetScreen(new IsoScreen());
        break;
      case '5':
        screenManager.requestSetScreen(new PrerenderedScreen());
        break;
      case '6':
        screenManager.requestSetScreen(new RPGScreen());
        break;
      case '7':
        screenManager.requestSetScreen(new ShootemupScreen());
        break;
      case '8':
        screenManager.requestSetScreen(new TCGScreen(), { duelId: '0000' });
        break;
      case '9':
        screenManager.requestSetScreen(new ThirdPersonScreen());
        break;
      case '10':
        screenManager.requestSetScreen(new TilemapScreen());
        break;
      case '11':
        screenManager.requestSetScreen(new TilemapIsoScreen());
        break;
      case '12':
        screenManager.requestSetScreen(new TilemapPathfindingScreen());
        break;
      case '13':
        screenManager.requestSetScreen(new TripleTriadScreen());
        break;
      case '14':
        screenManager.requestSetScreen(new VisualNovelScreen());
        break;
      case '15':
        screenManager.requestSetScreen(new PlatformerScreen());
        break;
      case '16':
        screenManager.requestSetScreen(new PhysicsJoltScreen());
        break;
      case '17':
        screenManager.requestSetScreen(new PhysicsBox2DScreen());
        break;
      case '18':
        screenManager.requestSetScreen(new SokobanScreen());
        break;
      default:
        console.log('Unknown template ID:', data.id);
    }
  }

  handleUtilSelected(data) {
    if (data.id == '0') {
      screenManager.requestSetScreen(new CurveScreen());
    }
    else if (data.id == '1') {
      screenManager.requestSetScreen(new ParticlesScreen());
    }
    else if (data.id == '2') {
      screenManager.requestSetScreen(new PerfScreen());
    }
    else if (data.id == '3') {
      screenManager.requestSetScreen(new ShadowScreen());
    }
    else if (data.id == '4') {
      screenManager.requestSetScreen(new UserInterfaceScreen());
    }
    else if (data.id == '5') {
      screenManager.requestSetScreen(new ViewerScreen());
    }
    else if (data.id == '6') {
      screenManager.requestSetScreen(new MenuRingScreen());
    }
    else if (data.id == '7') {
      screenManager.requestSetScreen(new PackScreen());
    }
  }

  handleIASelected(data) {
    if (data.id == '0') {
      screenManager.requestSetScreen(new SokobanScreen());
    }
    else if (data.id == '1') {
      screenManager.requestSetScreen(new CanChaseScreen());
    }
  }
}

export { BootScreen };
