import { em } from '@lib/engine_manager';
import { screenManager } from '@lib/screen/screen_manager';
// ---------------------------------------------------------------------------------------
import { BootScreen } from './boot_screen';
// ---------------------------------------------------------------------------------------

em.startup();
screenManager.requestSetScreen(new BootScreen());