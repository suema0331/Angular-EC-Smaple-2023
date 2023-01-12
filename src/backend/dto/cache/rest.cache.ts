export interface RestCache<T> {
  backendDT?: number;
  frontendDT?: number;
  data?: T;
}

export interface RestCacheMap<T> {
  [key: string]: RestCache<T>;
}
