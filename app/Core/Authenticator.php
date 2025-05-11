<?php

declare(strict_types=1);

namespace App\Core;

use Nette\Database\Explorer;
use Nette\Security\AuthenticationException;
use Nette\Security\Passwords;
use Nette\Security\SimpleIdentity;

class Authenticator implements \Nette\Security\Authenticator
{
    public function __construct(
        private Explorer $db,
        private Passwords $passwords
    ) {
    }

    public function authenticate(string $username, string $password): SimpleIdentity
    {
        $row = $this->db->table('users')
            ->where('email', $username)
            ->fetch();

        if (!$row) {
            throw new AuthenticationException('User with this e-mail was not found.');
        }

        if (!$this->passwords->verify($password, $row->password)) {
            throw new AuthenticationException('Incorrect password.');
        }

        return new SimpleIdentity(
            $row->id,
            $row->role,
            [
                'email' => $row->email
            ]
        );
    }
}