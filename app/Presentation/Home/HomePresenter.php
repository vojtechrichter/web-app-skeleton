<?php

declare(strict_types=1);

namespace App\Presentation\Home;

use App\Definitions\Stripe\Price;
use App\Facades\StripeFacade;
use App\Presentation\BasePresenter;

final class HomePresenter extends BasePresenter
{
    public function __construct(
        private StripeFacade $stripe
    ) {
    }

    public function actionPlan1(): void
    {
        $session = $this->stripe->createCheckoutSession([
            [
                'price' => Price::TestPlan->value,
                'quantity' => 1
            ]
        ], $this->link('//PaymentDone'), $this->link('//Home:'));

        $this->redirectUrl($session->url);
    }

    public function actionPlan2(): void
    {

    }

    public function handleTest(): void
    {
        $this->flashMessage('ajax!!');

        $this->redrawFlashes();
    }

    public function renderDefault(): void
    {
    }
}
