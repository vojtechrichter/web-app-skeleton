import '../assets/styles/main.css';

import naja from 'naja';
import { Application } from '@hotwired/stimulus';
import RequestController from './controllers/request_controller';

// Stimulus

const application = Application.start();

application.register('request', RequestController);

// Naja

naja.uiHandler.selector = '[data-naja]';

naja.initialize();