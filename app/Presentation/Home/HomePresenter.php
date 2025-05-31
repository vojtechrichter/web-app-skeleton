<?php

declare(strict_types=1);

namespace App\Presentation\Home;

use App\Presentation\BasePresenter;

final class HomePresenter extends BasePresenter
{
    public function renderDefault(): void
    {
        $this->template->setFile(__DIR__ . '/../TemplateComponents/dashboard-home.latte');
    }
}
