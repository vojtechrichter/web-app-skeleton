<?php

declare(strict_types=1);

namespace App\Presentation;

use Nette\Application\UI\Presenter;
use Nette\Database\Explorer;
use Nette\DI\Attributes\Inject;

abstract class BasePresenter extends Presenter
{
    #[Inject]
    public Explorer $db;

    public function redrawFlashes(): void
    {
        $this->redrawControl('flashes');
    }
}