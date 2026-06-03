import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNewsByCategory } from "@/services/newsApi";
import { fetchRecommendations } from "@/services/tmdbApi";
import { fetchSocialPosts } from "@/services/socialApi";

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  source?: string;
  category?: string;
  publishedAt?: string;
  url?: string;
  type?: string;
}

interface ContentState {
  newsArticles: ContentItem[];
  recommendations: ContentItem[];
  socialPosts: ContentItem[];
  trending: ContentItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: ContentState = {
  newsArticles: [],
  recommendations: [],
  socialPosts: [],
  trending: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const fetchNews = createAsyncThunk(
  "content/fetchNews",
  async (
    params: { category: string; page: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      return await fetchNewsByCategory(params.category, params.page, params.pageSize);
    } catch (error) {
      return rejectWithValue("Unable to fetch news at the moment.");
    }
  }
);

export const fetchRecommendationsAsync = createAsyncThunk(
  "content/fetchRecommendations",
  async (params: { page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      return await fetchRecommendations(params.page, params.pageSize);
    } catch (error) {
      return rejectWithValue("Unable to fetch recommendations.");
    }
  }
);

export const fetchSocialAsync = createAsyncThunk(
  "content/fetchSocial",
  async (params: { page: number; pageSize: number }, { rejectWithValue }) => {
    try {
      return await fetchSocialPosts(params.page, params.pageSize);
    } catch (error) {
      return rejectWithValue("Unable to fetch social posts.");
    }
  }
);

export const fetchTrendingAsync = createAsyncThunk(
  "content/fetchTrending",
  async (_: void, { rejectWithValue }) => {
    try {
      const recommendations = await fetchRecommendations(1, 6);
      const social = await fetchSocialPosts(1, 6);
      return [...recommendations, ...social];
    } catch (error) {
      return rejectWithValue("Unable to fetch trending content.");
    }
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setNewsArticles: (state, action: PayloadAction<ContentItem[]>) => {
      state.newsArticles = action.payload;
    },
    addNewsArticles: (state, action: PayloadAction<ContentItem[]>) => {
      state.newsArticles = [...state.newsArticles, ...action.payload];
    },
    setRecommendations: (state, action: PayloadAction<ContentItem[]>) => {
      state.recommendations = action.payload;
    },
    setSocialPosts: (state, action: PayloadAction<ContentItem[]>) => {
      state.socialPosts = action.payload;
    },
    addSocialPosts: (state, action: PayloadAction<ContentItem[]>) => {
      state.socialPosts = [...state.socialPosts, ...action.payload];
    },
    setTrending: (state, action: PayloadAction<ContentItem[]>) => {
      state.trending = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearContent: (state) => {
      state.newsArticles = [];
      state.recommendations = [];
      state.socialPosts = [];
      state.trending = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentPage > 1) {
          state.newsArticles = [...state.newsArticles, ...action.payload];
        } else {
          state.newsArticles = action.payload;
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRecommendationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSocialAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.socialPosts = action.payload;
      })
      .addCase(fetchSocialAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTrendingAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setNewsArticles,
  addNewsArticles,
  setRecommendations,
  setSocialPosts,
  addSocialPosts,
  setTrending,
  setLoading,
  setError,
  setCurrentPage,
  clearContent,
} = contentSlice.actions;

export default contentSlice.reducer;
