[Route:apiRresourceを使おう【Laravel Routing】](https://zenn.dev/naoki_oshiumi/articles/8fc5b9d20bcc89)
https://readouble.com/laravel/11.x/ja/sanctum.html
https://readouble.com/laravel/11.x/ja/fortify.html
https://zenn.dev/pcs_engineer/articles/laravel11-faq

## create laravel project for api

```
composer create-project --prefer-dist laravel/laravel:^11.0 backend
```

```
cd backend
```

APIに必要ないと思われるファイルを削除（不具合が出たら戻す）

```shell
rm -rf resources/js
rm -rf resources/css
rm -rf resources/views
rm -rf resources
rm -f vite.config.js
rm -f package.json
rm -rf routes/console.php
```

sanctumをインストールする

```shell
php artisan install:api
php artisan config:publish cors
```

## レスポンスがJSONで返るようにする

https://laravel.com/docs/11.x/errors
https://zenn.dev/blancpanda/articles/laravel-api-exception-renderer


登録されているルートを確認する

```shell
 php artisan route:list
```

front
https://mantine.dev/getting-started/
https://mantine.dev/guides/next/

```bash
yarn install//
```

https://qiita.com/hikagami/items/da055860df931c30820b
https://qiita.com/niisan-tokyo/items/9c799989cb535489f201

```
php artisan make:model Task -m
php artisan make:controller Api/TaskController --api
```

## 画面キャプチャ

[Online Video Converter Aug 30 (1).webm](https://github.com/user-attachments/assets/e38ca5a4-1845-4b39-afc4-870c2a672142)
