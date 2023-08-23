import { useSearchParams } from 'next/navigation';

export const useGetQueryParam = (name: string): string | null => {
    return useSearchParams()?.get(name);
};
