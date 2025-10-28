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
  private client: Vimeo | null = null;
  private userId: string;

  constructor() {
    const clientId = process.env.VIMEO_CLIENT_ID;
    const clientSecret = process.env.VIMEO_CLIENT_SECRET;
    const accessToken = process.env.VIMEO_ACCESS_TOKEN;
    this.userId = process.env.VIMEO_USER_ID || 'grittyflint';

    if (!clientId || !clientSecret || !accessToken) {
      console.warn('Vimeo credentials not configured. Skipping Vimeo integration.');
      return;
    }

    this.client = new Vimeo(clientId, clientSecret, accessToken);
  }

  async getVideos(): Promise<VimeoVideo[]> {
    if (!this.client) {
      return [];
    }

    return new Promise((resolve, reject) => {
      this.client!.request(
        {
          method: 'GET',
          path: `/users/${this.userId}/videos`,
          query: {
            per_page: 100,
            sort: 'date',
            direction: 'desc',
            fields: 'uri,name,description,link,duration,pictures,created_time,tags'
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

  async syncVideosToProjects(storage: any): Promise<void> {
    if (!this.client) {
      console.log('Vimeo client not initialized - skipping sync');
      return;
    }

    try {
      const videos = await this.getVideos();
      let syncedCount = 0;

      for (const video of videos) {
        const vimeoId = video.uri.split('/').pop() || '';
        
        const exists = await storage.projectExists(vimeoId);
        if (exists) {
          continue;
        }

        const category = this.categorizeVideo(video.tags);
        const thumbnailUrl = video.pictures?.sizes?.[video.pictures.sizes.length - 1]?.link || '';
        const year = new Date(video.created_time).getFullYear().toString();

        await storage.createProject({
          title: video.name,
          description: video.description || 'A cinematic project',
          videoUrl: video.link,
          thumbnailUrl,
          category,
          vimeoId,
          year,
          client: undefined,
          role: 'Director of Photography',
          credits: `Duration: ${Math.floor(video.duration / 60)}m ${video.duration % 60}s`
        });
        
        syncedCount++;
        console.log(`Synced new project: ${video.name}`);
      }

      console.log(`Sync complete: ${syncedCount} new videos added from ${videos.length} total`);
    } catch (error) {
      console.error('Failed to sync Vimeo videos:', error);
      throw error;
    }
  }

  private categorizeVideo(tags: Array<{ name: string }>): string {
    const tagNames = tags.map(t => t.name.toLowerCase());

    if (tagNames.some(t => t.includes('brand') || t.includes('campaign'))) {
      return 'brand-campaign';
    }
    if (tagNames.some(t => t.includes('product'))) {
      return 'product-film';
    }
    if (tagNames.some(t => t.includes('case') || t.includes('study'))) {
      return 'case-study';
    }
    if (tagNames.some(t => t.includes('commercial'))) {
      return 'commercial';
    }

    return 'brand-campaign';
  }
}

export const vimeoService = new VimeoService();