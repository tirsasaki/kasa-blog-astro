import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import { website } from "../config";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title:website.name,
    description: website.description,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      content: parser.render(post.body),
      link: `/blog/${post.slug}/`,
      categories: post.data.categories,
      author: post.data.author
    })),
    customData: `<language>id-ID</language>`
  });
}