<?php

declare(strict_types=1);

namespace App\Presentation\Login;

use App\Presentation\BasePresenter;
use Nette\Application\UI\Form;
use Nette\Security\AuthenticationException;
use Nette\Security\Passwords;
use Nette\Utils\ArrayHash;

final class LoginPresenter extends BasePresenter
{
    public function __construct(
        private Passwords $passwords
    ) {
    }

    public function createComponentLoginForm(): Form
    {
        $form = new Form();

        $form->addEmail('email', 'E-mail')
            ->setRequired();

        $form->addPassword('password', 'Password')
            ->setRequired();

        $form->addSubmit('submit', 'Login');

        $form->onSuccess[] = $this->loginFormSucceeded(...);

        return $form;
    }

    public function loginFormSucceeded(Form $form, ArrayHash $values): void
    {
        try {
            $this->getUser()->login($values->email, $values->password);;
        } catch (AuthenticationException $e) {
            $this->flashMessage($e->getMessage(), 'error');
            $this->redrawControl('flashes');
        }
    }
}