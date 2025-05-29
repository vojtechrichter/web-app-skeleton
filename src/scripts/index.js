import '../assets/styles/main.css';

import naja from 'naja';

import LoaderExtension from './naja_extensions/LoaderExtension';

import { Application } from '@hotwired/stimulus';
import AutoSubmit from '@stimulus-components/auto-submit';
import Dialog from '@stimulus-components/dialog';
import Dropdown from "@stimulus-components/dropdown";
import Notification from "@stimulus-components/notification";
import PasswordVisibility from "@stimulus-components/password-visibility";
import Prefetch from "@stimulus-components/prefetch";
import ScrollProgress from "@stimulus-components/scroll-progress";
import TextareaAutogrow from 'stimulus-textarea-autogrow';
import NajaController from './controllers/naja_controller';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Stimulus

const application = Application.start();

application.register('auto-submit', AutoSubmit);
application.register('dialog', Dialog);
application.register('dropdown', Dropdown);
application.register('notification', Notification);
application.register('password-visibility', PasswordVisibility);
application.register('prefetch', Prefetch);
application.register('scroll-progress', ScrollProgress);
application.register('textarea-autogrow', TextareaAutogrow);
application.register('naja', NajaController);

// Naja

naja.registerExtension(new LoaderExtension('#globalLoader'));

naja.uiHandler.selector = '[data-naja]';

naja.initialize();

// Other

Fancybox.bind('[data-fancybox]');
