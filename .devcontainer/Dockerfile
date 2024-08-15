FROM node:20-slim as node
FROM php:8.3

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# composerのセットアップ
# https://qiita.com/yatsbashy/items/02bbbebbfe7e5a5976bc
COPY --from=composer:2.7.6 /usr/bin/composer /usr/bin/composer

RUN apt-get update

# xdebugのセットアップ
# phpとxdebugのバージョンが不一致だとビルドできなくなる
# https://xdebug.org/docs/compat
# postgresを構成する(libpq-dev, pgsql, pdo_pgsql)
RUN pecl install xdebug-3.3.2 \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pgsql pdo_pgsql \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-enable xdebug pdo pdo_pgsql pgsql

# nodejsのセットアップ
# https://qiita.com/snow_swallow/items/31e6bb582123a58676e3
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /opt/yarn-* /opt/yarn

RUN ln -fs /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -fs /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npx \
    && ln -fs /usr/local/lib/node /usr/local/bin/nodejs \
    && ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn \
    && ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarnpkg

# https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user#_creating-a-nonroot-user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
