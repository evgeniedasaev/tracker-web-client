# Tracker Web Client

Next.js 16 app with server actions, TailwindCSS v4 + DaisyUI, typed API layer, and auth via HttpOnly cookies.

## Структура

- `src/app` — маршруты и страницы, подключающие готовые фичи (`global-error.tsx`, `not-found.tsx`, layout с
  ToastProvider).
- `src/features` — фичи (UI + server actions + схемы для конкретной задачи). Пример: `features/auth`.
- `src/entities` — доменные типы/модели, переиспользуемые между фичами. Пример: `entities/auth`.
- `src/shared` — инфраструктура и общие блоки:
    - `shared/api` — `client.ts` (единый apiClient с retry/refresh), `token.ts` (HttpOnly кука).
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
    - `LOG_LEVEL` или `NEXT_PUBLIC_LOG_LEVEL` — `debug` | `info` | `warn` | `error`.

## Архитектура API/Auth

- Запросы идут через `src/shared/api/client.ts` (baseURL, `credentials: 'include'`, `cache: 'no-store'`, нормализация
  ошибок, zod-валидация ответов).
- Аутентификация: use-cases в `features/auth/model/use-cases.ts` вызывают сервис через реестр (`service-registry.ts`),
  ставят HttpOnly куку через `shared/api/token.ts`, при `401` client делает refresh (`/v2/auth/refresh`), токен
  обновляется.
- Валидация входных/выходных данных рядом с эндпоинтами (zod-схемы в `features/auth/model/contracts.ts`).
- Транспорт можно заменить (GraphQL и т.п.): реализуйте `AuthService` и укажите `AUTH_TRANSPORT` в env, либо поменяйте
  привязку в `service-registry.ts`.

## UI/UX

- Базовые экраны ошибок: `src/app/global-error.tsx`, `src/app/not-found.tsx`.
- Глобальные тосты: `src/shared/ui/ToastProvider.tsx` подключён в `src/app/layout.tsx`.
- TailwindCSS v4 + DaisyUI. Шрифты Geist через `next/font`.

## Как расширять

- Новая фича: создавайте `src/features/<name>` с `api/`, `actions/`, `ui/` и типами в `src/entities/<domain>`.
- Новые эндпоинты: добавляйте схемы (zod) рядом с вызовом API и используйте `apiRequest` для типобезопасности.
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
    - `model/` — контракты (zod-схемы), интерфейсы сервисов, use-cases, view-model (маппинг ошибок/стейта).
    - `api/` — адаптеры транспорта (например, `rest-*.service.ts`), которые реализуют интерфейсы из `model`.
    - `actions/` — server actions/use-cases, которые используют сервисы через реестр/инъекцию.
    - `ui/` — React-компоненты фичи (клиентские/серверные).
2. В `model` опишите схемы входа/выхода для эндпоинтов. В `api` используйте `shared/api/client.ts` с `schema` для
   валидации ответов.
3. Добавьте реестр/фабрику для транспортов, если нужен выбор (по аналогии с `features/auth/model/service-registry.ts`).
4. Подключите фичу в маршруте из `app/`, минимизируя бизнес-логику в файлах страницы.

### Новая сущность (entity)

1. В `src/entities/<domain>/` создайте файл(ы) с типами/моделями (например, `user.types.ts`).
2. Экспортируйте доменные типы, не завязывая их на конкретный транспорт или UI.
3. Используйте эти типы в фичах (`features/<name>`) и адаптерах API для типобезопасности.
