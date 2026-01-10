'use client';

class AccessTokenStore {
  private token: string | null = null;

  get() {
    return this.token;
  }

  set(token: string | null) {
    this.token = token;
  }

  clear() {
    this.token = null;
  }
}

export const accessTokenStore = new AccessTokenStore();
