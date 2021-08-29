<?php

use App\Bootstrap\AppManager;
use DI\ContainerBuilder;
use Dotenv\Dotenv;

require __DIR__ . '/_DirectoryLister-3.7.6/app/vendor/autoload.php';

// Set file access restrictions
// ini_set('open_basedir', __DIR__ . '/_DirectoryLister-3.7.6');
ini_set('open_basedir', __DIR__);

// Initialize environment variable handler
Dotenv::createUnsafeImmutable(__DIR__)->safeLoad();

// Initialize the container
$container = (new ContainerBuilder)->addDefinitions(
    ...glob(__DIR__ . '/_DirectoryLister-3.7.6/app/config/*.php')
);

// Compile the container
if (! filter_var(getenv('APP_DEBUG'), FILTER_VALIDATE_BOOL)) {
    $container->enableCompilation(__DIR__ . '/_DirectoryLister-3.7.6/app/cache');
}

// Initialize the application
$app = $container->build()->call(AppManager::class);

// Engage!
$app->run();
