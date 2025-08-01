import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import axios from '@/utils/axios';

export interface DeputyMinister {
  id: number;
  first_name: {
    ka: string;
    en: string;
  };
  last_name: {
    ka: string;
    en: string;
  };
  full_name: string;
  description: {
    ka: string;
    en: string;
  };
  phone: string;
  email: string;
  photo: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  telegram_url: string | null;
  attachments: Array<{
    url: string;
    name: string;
    size: number;
  }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useDeputyMinisters() {
  const deputyMinisters = ref<DeputyMinister[]>([]);
  const loading = ref(false);
  const error = ref('');

  const fetchDeputyMinisters = async (): Promise<DeputyMinister[]> => {
    try {
      const response = await axios.get('/deputy-ministers');
      return response.data.data || response.data;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message || 'Error fetching deputy ministers');
    }
  };

  const fetchDeputyMinister = async (id: number): Promise<DeputyMinister> => {
    try {
      const response = await axios.get(`/deputy-ministers/${id}`);
      return response.data.data || response.data;
    } catch (err: any) {
      throw new Error(err?.response?.data?.message || err.message || 'Error fetching deputy minister');
    }
  };

  return {
    deputyMinisters,
    loading,
    error,
    fetchDeputyMinisters,
    fetchDeputyMinister,
  };
}

export function useDeputyMinistersQuery() {
  return useQuery({
    queryKey: ['deputy-ministers'],
    queryFn: async () => {
      const response = await axios.get('/deputy-ministers');
      return response.data.data || response.data;
    },
  });
}

export function useDeputyMinisterQuery(id: number) {
  return useQuery({
    queryKey: ['deputy-minister', id],
    queryFn: async () => {
      const response = await axios.get(`/deputy-ministers/${id}`);
      return response.data.data || response.data;
    },
    enabled: !!id,
  });
} 