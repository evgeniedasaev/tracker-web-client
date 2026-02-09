export function createServiceRegistry<T>(
  configValue: string,
  registry: Record<string, T>,
): () => T {
  return () => {
    const service = registry[configValue];
    if (!service) {
      throw new Error(
        `Service registry: no service found for key "${configValue}". Available keys: ${Object.keys(
          registry,
        ).join(', ')}`,
      );
    }
    return service;
  };
}
