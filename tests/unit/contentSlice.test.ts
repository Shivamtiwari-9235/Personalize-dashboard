import contentReducer, { fetchNews } from '@/store/slices/contentSlice';

describe('contentSlice reducer', () => {
  const initial = { newsArticles: [], recommendations: [], socialPosts: [], trending: [], loading: false, error: null, currentPage: 1 } as any;

  it('sets loading on fetchNews.pending', () => {
    const next = contentReducer(initial, { type: fetchNews.pending.type });
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('sets data on fetchNews.fulfilled', () => {
    const payload = [{ id: 'n1', title: 'X' }];
    const next = contentReducer({ ...initial, currentPage: 1 }, { type: fetchNews.fulfilled.type, payload });
    expect(next.loading).toBe(false);
    expect(next.newsArticles).toEqual(payload);
  });

  it('sets error on fetchNews.rejected', () => {
    const next = contentReducer(initial, { type: fetchNews.rejected.type, payload: 'err' });
    expect(next.loading).toBe(false);
    expect(next.error).toBe('err');
  });
});
