<?php

declare(strict_types=1);

namespace App\Presentation;

abstract class BaseDashboardPresenter extends BasePresenter
{
    public function getMenu(): array
    {
        return [
            'Dashboard' => [
                'presenter' => 'Dashboard',
                'action' => 'default'
            ]
        ];
    }
}
