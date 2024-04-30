import { createApi } from '@reduxjs/toolkit/query';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://662ada9fde35f91de156912f.mockapi.io/student' }),
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => '/posts',
        transformResponse: (response) => {
            // приводим данные ответа к нужному формату
            const posts = response.map((post) => ({
              ...post,
              date: new Date(),
            }));
            return posts;
        },
      }),
      addPost: builder.mutation({
        query: (body) => ({
          url: '/posts',
          method: 'POST',
          body,
        }), // Добавление поста 
        invalidatesTags: ['Posts'],
      }),
    }),
  });
export const { useGetPostsQuery, useAddPostMutation } = postsApi;

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://662ada9fde35f91de156912f.mockapi.io/student' }),
  endpoints: (builder) => ({
    getBlogData: builder.query({
      queryFn: async () => {
        const [posts, authors] = await Promise.all([
          fetch('https://662ada9fde35f91de156912f.mockapi.io/student/posts').then((res) => res.json()),
          fetch('https://662ada9fde35f91de156912f.mockapi.io/student/authors').then((res) => res.json()),
        ]);
        return { posts, authors };
      },
      transformResponse: (response) => {
        const { posts, authors } = response;
        const authorsById = {};
        authors.forEach((author) => {
          authorsById[author.id] = author;
        });
        const postsWithAuthors = posts.map((post) => ({
          ...post,
          author: authorsById[post.authorId],
        }));
        return postsWithAuthors;
      },
    }),
  }),
});

export const { useGetBlogDataQuery } = blogApi;