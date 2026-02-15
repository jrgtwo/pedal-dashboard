import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,       // 5 minutes before data is considered stale
      gcTime: 1000 * 60 * 10,          // 10 minutes before inactive cache is garbage collected
      retry: 1,                         // retry failed queries once
      refetchOnWindowFocus: false,      // avoid surprise refetches
    },
    mutations: {
      retry: 0, // do not retry failed mutations
    },
  },
});

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
