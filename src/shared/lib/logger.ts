type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type Reporter = (level: LogLevel, message: string, meta?: unknown) => void | Promise<void>;

const levelOrder: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const envLogLevel = (process.env.LOG_LEVEL ??
  process.env.NEXT_PUBLIC_LOG_LEVEL ??
  'info') as LogLevel;
const resolvedLogLevel = levelOrder[envLogLevel];
const shouldLog = (level: LogLevel) => levelOrder[level] >= resolvedLogLevel;

let reporter: Reporter | null = null;

export const setLoggerReporter = (customReporter: Reporter) => {
  reporter = customReporter;
};

const log = (level: LogLevel, message: string, meta?: unknown) => {
  if (!shouldLog(level)) return;

  const payload = meta ? { message, meta } : { message };
  if (level === 'error') {
    console.error(payload);
  } else if (level === 'warn') {
    console.warn(payload);
  } else if (level === 'info') {
    console.info(payload);
  } else {
    console.debug(payload);
  }

  if (reporter) void reporter(level, message, meta);
};

export const logger = {
  debug: (message: string, meta?: unknown) => {
    log('debug', message, meta);
  },
  info: (message: string, meta?: unknown) => {
    log('info', message, meta);
  },
  warn: (message: string, meta?: unknown) => {
    log('warn', message, meta);
  },
  error: (message: string, meta?: unknown) => {
    log('error', message, meta);
  },
};
