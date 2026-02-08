export function createServiceRegistry<T>(
  configValue: string,
  registry: Record<string, T>,
): () => T {
  return () => registry[configValue];
}
