<?php

declare(strict_types=1);

namespace App\Latte;

use Nette\Utils\Image;

final class ResizeFilter
{
    public function __invoke(string $filename, int $width, int $height): string
    {
        $image = Image::fromFile(__DIR__ . '/../../www/' . ltrim(str_replace(' ', '', $filename), '/'));
        $image->resize($width, $height);

        $explodedPath = explode('/', $filename);
        array_pop($explodedPath);
        $savePath = __DIR__ . '/../../www/' . implode('/', $explodedPath) . '/' . pathinfo($filename, PATHINFO_FILENAME) . '_' . $width . 'x' . $height . '.' . pathinfo($filename, PATHINFO_EXTENSION);
        if (!file_exists($savePath)) {
            $image->save($savePath);
        }

        return implode('/', $explodedPath) . '/' . pathinfo($filename, PATHINFO_FILENAME) . '_' . $width . 'x' . $height . '.' . pathinfo($filename, PATHINFO_EXTENSION);
    }
}