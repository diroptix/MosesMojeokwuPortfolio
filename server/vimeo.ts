
import { Vimeo } from '@vimeo/vimeo';
import type { InsertProject } from '@shared/schema';

interface VimeoVideo {
  uri: string;
  name: string;
  description: string | null;
  link: string;
  duration: number;
  pictures: {
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  created_time: string;
  tags: Array<{ name: string }>;
}

export class VimeoService {
  private client: Vimeo;
  private userId: string;

  constructor(clientId: string, clientSecret: string, accessToken: string, userId: string) {
    this.client = new Vimeo(clientId, clientSecret, accessToken);
    this.userId = userId;
  }

  async fetchUserVideos(): Promise<InsertProject[]> {
    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: 'GET',
          path: `/users/${this.userId}/videos`,
          query: {
            per_page: 100,
            sort: 'date',
            direction: 'desc'
          }
        },
        (error, body) => {
          if (error) {
            reject(error);
            return;
          }

          const videos = (body as any).data as VimeoVideo[];
          const projects: InsertProject[] = videos.map((video) => {
            const vimeoId = video.uri.split('/').pop() || '';
            const year = new Date(video.created_time).getFullYear().toString();
            
            // Determine category from tags
            let category = 'brand-campaign';
            const tags = video.tags.map(t => t.name.toLowerCase());
            
            if (tags.some(t => t.includes('product') || t.includes('commercial'))) {
              category = 'product-film';
            } else if (tags.some(t => t.includes('case') || t.includes('study') || t.includes('documentary'))) {
              category = 'case-study';
            }

            // Get thumbnail from Vimeo
            const thumbnail = video.pictures?.sizes?.[video.pictures.sizes.length - 1]?.link || undefined;

            return {
              title: video.name,
              description: video.description || 'No description available',
              videoUrl: video.link,
              thumbnailUrl: thumbnail,
              category,
              year,
              vimeoId,
              client: undefined,
              role: 'Director of Photography',
              credits: `Duration: ${Math.floor(video.duration / 60)}m ${video.duration % 60}s`
            };
          });

          resolve(projects);
        }
      );
    });
  }

  async syncVideosToStorage(storage: any): Promise<void> {
    const projects = await this.fetchUserVideos();
    
    for (const project of projects) {
      await storage.createProject(project);
    }
  }
}

export function createVimeoService(): VimeoService | null {
  const clientId = process.env.VIMEO_CLIENT_ID;
  const clientSecret = process.env.VIMEO_CLIENT_SECRET;
  const accessToken = process.env.VIMEO_ACCESS_TOKEN;
  const userId = process.env.VIMEO_USER_ID || 'grittyflint';

  if (!clientId || !clientSecret || !accessToken) {
    console.warn('Vimeo credentials not configured. Skipping Vimeo integration.');
    return null;
  }

  return new VimeoService(clientId, clientSecret, accessToken, userId);
}
import { Vimeo } from 'vimeo';

interface VimeoVideo {
  uri: string;
  name: string;
  description: string;
  link: string;
  created_time: string;
  pictures: {
    sizes: Array<{
      width: number;
      height: number;
      link: string;
    }>;
  };
  duration: number;
}

export class VimeoService {
  private client: any;

  constructor() {
    // Initialize Vimeo client with credentials from environment variables
    if (process.env.VIMEO_CLIENT_ID && process.env.VIMEO_CLIENT_SECRET && process.env.VIMEO_ACCESS_TOKEN) {
      this.client = new Vimeo(
        process.env.VIMEO_CLIENT_ID,
        process.env.VIMEO_CLIENT_SECRET,
        process.env.VIMEO_ACCESS_TOKEN
      );
    }
  }

  async getUserVideos(username: string = 'grittyflint'): Promise<any[]> {
    if (!this.client) {
      console.warn('Vimeo credentials not configured. Using fallback data.');
      return [];
    }

    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: 'GET',
          path: `/users/${username}/videos`,
          query: {
            per_page: 50,
            sort: 'date',
            direction: 'desc'
          }
        },
        (error: any, body: any) => {
          if (error) {
            console.error('Vimeo API error:', error);
            reject(error);
            return;
          }
          resolve(body.data || []);
        }
      );
    });
  }

  async getVideoById(videoId: string): Promise<VimeoVideo | null> {
    if (!this.client) {
      console.warn('Vimeo credentials not configured.');
      return null;
    }

    return new Promise((resolve, reject) => {
      this.client.request(
        {
          method: 'GET',
          path: `/videos/${videoId}`
        },
        (error: any, body: any) => {
          if (error) {
            console.error('Vimeo API error:', error);
            reject(error);
            return;
          }
          resolve(body);
        }
      );
    });
  }

  parseVimeoVideoToProject(video: VimeoVideo, category: string = 'brand-campaign') {
    const videoId = video.uri.split('/').pop() || '';
    const thumbnailUrl = video.pictures?.sizes?.[video.pictures.sizes.length - 1]?.link || '';
    
    return {
      title: video.name,
      description: video.description || 'Professional video production',
      videoUrl: video.link,
      thumbnailUrl,
      category,
      vimeoId: videoId,
      year: new Date(video.created_time).getFullYear().toString(),
    };
  }
}

export const vimeoService = new VimeoService();
