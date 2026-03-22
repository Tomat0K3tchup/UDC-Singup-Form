interface LoggerContext {
  currentRequestId: string | null;
}

const loggerContext: LoggerContext = {
  currentRequestId: null,
};

export function generateRequestId(): string {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

export function setRequestId(requestId: string): void {
  loggerContext.currentRequestId = requestId;
}

export function getRequestId(): string | null {
  return loggerContext.currentRequestId;
}

export function clearRequestId(): void {
  loggerContext.currentRequestId = null;
}

export function formatMessage(message: string): string {
  const requestId = getRequestId();
  if (requestId) {
    return `${requestId} | ${message}`;
  }
  return message;
}

interface IAppLogger {
  log: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export const AppLogger: IAppLogger = {
  log(...args: unknown[]) {
    if (args.length == 0) return;
    console.log(formatMessage(String(args[0])), ...args.slice(1));
  },

  debug(...args: unknown[]) {
    if (args.length == 0) return;
    console.log(formatMessage(String(args[0])), ...args.slice(1));
  },

  info(...args: unknown[]) {
    if (args.length == 0) return;
    console.info(formatMessage(String(args[0])), ...args.slice(1));
  },

  warn(...args: unknown[]) {
    if (args.length == 0) return;
    console.warn(formatMessage(String(args[0])), ...args.slice(1));
  },

  error(...args: unknown[]) {
    if (args.length == 0) return;
    console.error(formatMessage(String(args[0])), ...args.slice(1));
  },
};
