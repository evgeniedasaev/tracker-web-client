# Tracker Web Client

Next.js 16 app with server actions, TailwindCSS v4 + DaisyUI, typed REST API layer, and auth via HttpOnly cookies.

## Структура

- `src/app` — маршруты и страницы, подключающие готовые фичи (`global-error.tsx`, `not-found.tsx`, layout с
  ToastProvider).
- `src/features` — фичи (UI + server actions + use-cases + сервисы). Пример: `features/auth`.
- `src/shared` — инфраструктура и общие блоки:
    - `shared/api/rest` — `server-client.ts` (server-only, с refresh), `client.ts` (browser-safe), контракты и маппинг ошибок.
    - `shared/api/cookie-token.ts` — работа с HttpOnly кукой и refresh.
    - `shared/config` — `config.ts` (валидация env через zod, общие настройки).
    - `shared/lib` — вспомогательные библиотеки (logger с reporter/уровнями).
    - `shared/ui` — общие клиентские блоки (ToastProvider).
- `middleware.ts` — edge-guard для защищённых путей (`/app`, `/dashboard`), пытается refresh и ставит куку либо
  редиректит на `/login?redirectTo=...`.

## Скрипты

- `npm run dev` — локальная разработка.
- `npm run build` — production-сборка.
- `npm run start` — запуск собранного приложения.
- `npm run lint` — ESLint (Next 16 + TS strict + Prettier).
- `npm run format` / `npm run format:fix` — проверка/автоисправление Prettier.

## Настройка окружения

1. Node.js 18+.
2. Установить зависимости: `npm install`.
3. Env: создать `.env.local` и задать переменные:
    - `NEXT_PUBLIC_API_URL` — базовый URL backend API (используется на сервере и клиенте).
    - `AUTH_TRANSPORT` — `rest` (по умолчанию), для переключения транспорта фич auth.
    - `SESSION_TRANSPORT` — `cookie` (по умолчанию), для переключения слоя сессии.
    - `WORKOUTS_TRANSPORT` — `rest` (по умолчанию), для переключения транспорта фич workouts.
    - `LOG_LEVEL` или `NEXT_PUBLIC_LOG_LEVEL` — `debug` | `info` | `warn` | `error`.

## Архитектура API/Auth

- Server-side запросы идут через `src/shared/api/rest/server-client.ts` (baseURL, `credentials: 'include'`,
  `cache: 'no-store'`, нормализация ошибок, zod-валидация ответов, refresh по `401`).
- Browser-side запросы идут через `src/shared/api/rest/client.ts` (без refresh и без работы с cookie-токеном).
- Аутентификация: use-cases в `features/auth/model/use-cases.ts` получают `AuthService` и `SessionService` через DI из
  `features/auth/service/registry.ts`. Сессия ставится через `shared/api/cookie-token.ts`.
- Валидация входных/выходных данных рядом с эндпоинтами (zod-схемы в `features/auth/service/contracts.ts`).
- Транспорт можно заменить: реализуйте `AuthService` и укажите `AUTH_TRANSPORT` в env, либо поменяйте привязку в
  `features/auth/service/registry.ts`. Для сессии аналогично — через `SESSION_TRANSPORT`.

## UI/UX

- Базовые экраны ошибок: `src/app/global-error.tsx`, `src/app/not-found.tsx`.
- Глобальные тосты: `src/shared/ui/ToastProvider.tsx` подключён в `src/app/layout.tsx`.
- TailwindCSS v4 + DaisyUI. Шрифты Geist через `next/font`.

## Как расширять

- Новая фича: создавайте `src/features/<name>` с `service/`, `actions/`, `ui/`, `model/`.
- Новые эндпоинты: добавляйте схемы (zod) рядом с вызовом API и используйте `apiRequest` из
  `shared/api/rest/server-client.ts` (server) или `shared/api/rest/client.ts` (browser) для типобезопасности.
- Общие утилиты и конфиг — в `src/shared`.
- Auth/Server actions: Next 16 требует async-работы с cookies — в server actions всегда `await` функции из
  `shared/api/token.ts` (они сами делают `await cookies()`). Ошибки показываются тостами (ToastProvider, позиция
  top-right).

## Как добавить новый роут, фичу и сущность

### Новый роут

1. Создайте страницу в `src/app/<route>/page.tsx` (или вложенные папки). Страница должна собирать готовые блоки из
   `src/features`/`src/shared`.
2. Если маршрут защищённый, убедитесь, что он попадает под `middleware.ts` (`matcher`) или добавьте новый префикс для
   гардов/refresh.
3. При необходимости добавьте `loading.tsx`/`global-error.tsx`/`not-found.tsx` рядом с маршрутом для локальной
   обработки.

### Новая фича

1. Создайте каталог `src/features/<name>/` со стандартными подпапками:
    - `model/` — доменные типы, интерфейсы сервисов, use-cases, view-model (маппинг ошибок/стейта).
    - `service/` — адаптеры транспорта (например, `rest-*.service.ts`), которые реализуют интерфейсы из `model`.
    - `actions/` — server actions, которые валидируют input и инжектят сервисы в use-cases.
    - `ui/` — React-компоненты фичи (клиентские/серверные).
2. В `service` опишите схемы входа/выхода для эндпоинтов. Используйте `shared/api/rest/server-client.ts` с `schema` для
   валидации ответов.
3. Добавьте реестр для транспортов, если нужен выбор (по аналогии с `features/auth/service/registry.ts`).
4. Подключите фичу в маршруте из `app/`, минимизируя бизнес-логику в файлах страницы.

### Доменные типы

1. Если домен живет в одной фиче — храните типы в `features/<name>/model/types.ts`.
2. Если домен переиспользуется между фичами — вынесите его в `shared/model` или заведите `src/entities/<domain>`.
