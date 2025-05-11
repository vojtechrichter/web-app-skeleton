<?php

declare(strict_types=1);

namespace App\Facades;

use Stripe\Charge;
use Stripe\Checkout\Session;
use Stripe\Collection;
use Stripe\Customer;
use Stripe\StripeClient;

final class StripeFacade
{
    private StripeClient $client;

    public function __construct(
        private string $apiKey
    ) {
        $this->client = new StripeClient($this->apiKey);
    }

    public function customerHasSubscription(string $customerId, ?string $priceId = null): bool
    {
        $args = [
            'customer' => $customerId,
            'status' => 'active'
        ];

        if ($priceId) {
            $args['price'] = $priceId;
        }

        $subscriptions = $this->client->subscriptions->all($args);

        if ($subscriptions->data) {
            return true;
        }

        return false;
    }

    public function getCustomer(string $customerId): Customer
    {
        return $this->client->customers->retrieve($customerId);
    }

    /**
     * @param string $customerId
     * @return Collection<Charge>
     * @throws \Stripe\Exception\ApiErrorException
     */
    public function getCustomerCharges(string $customerId): Collection
    {
        return $this->client->charges->all([
            'customer' => $customerId
        ]);
    }

    public function getCheckoutSessionCustomer(string $sessionId): Customer
    {
        return $this->client->checkout->sessions->retrieve($sessionId)->customer;
    }

    /**
     * @param array $items
     * @return Session
     * @throws \Stripe\Exception\ApiErrorException
     */
    public function createCheckoutSession(
        array $items,
        string $successUrl,
        string $cancelUrl,
        ?string $customerId = null
    ): Session
    {
        $args = [
            'mode' => Session::MODE_SUBSCRIPTION,
            'success_url' => $successUrl . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => $cancelUrl,
            'line_items' => $items,
            'automatic_tax' => [
                'enabled' => true
            ]
        ];

        if ($customerId) {
            $args['customer'] = $customerId;
        }

        return $this->client->checkout->sessions->create($args);
    }
}