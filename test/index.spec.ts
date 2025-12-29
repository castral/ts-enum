import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ts-enum', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should work', () => {
    const t = true;
    expect(t).toBeTruthy();
  });
});
