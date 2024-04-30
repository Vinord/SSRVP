import {QueryClient,QueryClientProvider, useQuery,} from 'react-query';
const queryClient = new QueryClient();

export function TApp() {
  return(
    <QueryClientProvider client={queryClient}>
    <Example />
    </QueryClientProvider>
  )
};

function Example() {
  const { isLoading, IsError,error, data } = useQuery(
    'repoData',
    () =>
      fetch(
        'https://api.github.com/repositories/207645083'
      ).then((response) => response.json())
  );

  if (isLoading) return <p>Загрузка...</p>;

  if (IsError) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}