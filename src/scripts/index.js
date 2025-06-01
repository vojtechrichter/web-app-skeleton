import '../assets/styles/main.css';

import naja from 'naja';

import LoaderExtension from './naja_extensions/LoaderExtension';

import { Application } from '@hotwired/stimulus';
import AutoSubmit from '@stimulus-components/auto-submit';
import Dropdown from "@stimulus-components/dropdown";
import Notification from "@stimulus-components/notification";
import PasswordVisibility from "@stimulus-components/password-visibility";
import Prefetch from "@stimulus-components/prefetch";
import ScrollProgress from "@stimulus-components/scroll-progress";
import TextareaAutogrow from 'stimulus-textarea-autogrow';
import NajaController from './controllers/naja_controller';

// Dashboard Controllers
import DashboardController from './controllers/dashboard_controller';
import MenuItemController from './controllers/menu_item_controller';
import StatCardController from './controllers/stat_card_controller';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Stimulus

const application = Application.start();

// Existing controllers
application.register('auto-submit', AutoSubmit);
application.register('dropdown', Dropdown);
application.register('notification', Notification);
application.register('password-visibility', PasswordVisibility);
application.register('prefetch', Prefetch);
application.register('scroll-progress', ScrollProgress);
application.register('textarea-autogrow', TextareaAutogrow);
application.register('naja', NajaController);

// Dashboard controllers
application.register('dashboard', DashboardController);
application.register('menu-item', MenuItemController);
application.register('stat-card', StatCardController);

// Naja

naja.registerExtension(new LoaderExtension('#globalLoader'));

naja.uiHandler.selector = '[data-naja]';

naja.initialize();

// Other

Fancybox.bind('[data-fancybox]');
MicroModal.init({
    openTrigger: 'data-dialog-open',
    closeTrigger: 'data-dialog-close'
});
