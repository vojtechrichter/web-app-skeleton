<?php

declare(strict_types=1);

namespace App\Presentation;

use App\Facades\StripeFacade;

final class PaymentDonePresenter extends BasePresenter
{
    public function __construct(
    ) {
    }

    public function actionDefault(): void
    {
        $customer = $this->stripe->getCheckoutSessionCustomer($this->getParameter('session_id'));

        // save customer id & simpleidentity
    }
}
