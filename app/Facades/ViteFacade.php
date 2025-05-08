<?php

declare(strict_types=1);

namespace App\Facades;

final class ViteFacade {
    private bool $isDev = false;
    private array $manifest = [];
    private ?string $devServerUrl = null;

    public function __construct() {
        $this->isDev = file_exists(__DIR__ . '/../../node_modules/.vite/');
        $this->devServerUrl = 'http://localhost:5173';

        if (!$this->isDev) {
            $manifestPath = __DIR__ . '/../../www/dist/.vite/manifest.json';

            if (file_exists($manifestPath)) {
                $this->manifest = json_decode(file_get_contents($manifestPath), true);
            }
        }
    }

    public function getTags(string $entry = 'src/scripts/index.js'): string
    {
        if ($this->isDev) {
            return '
                <script type="module" src="' . $this->devServerUrl . '/@vite/client"></script>
                <script type="module" src="' . $this->devServerUrl . '/' . $entry . '"></script>
            ';
        } else {
            $file = $this->manifest[$entry]['file'] ?? '';
            $css = $this->manifest[$entry]['css'] ?? [];

            $tags = '';
            foreach ($css as $cssFile) {
                $tags .= '<link rel="stylesheet" href="/dist/' . $cssFile . '">';
            }
            $tags .= '<script type="module" src="/dist/' . $file . '"></script>';

            return $tags;
        }
    }

    public function getAssetPath(string $path): string
    {
        if ($this->isDev) {
            return $this->devServerUrl . '/' . $path;
        } else {
            return '/dist/' . ($this->manifest[$path]['file'] ?? $path);
        }
    }
}