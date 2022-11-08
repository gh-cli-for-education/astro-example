import { renderMarkdown } from '@astrojs/markdown-remark';

type FrontmatterValue = number | string | { [key: string]: FrontmatterValue };
export type Frontmatter = { [key: string]: FrontmatterValue };

export const injectFrontmatter = async (
  rawMarkdown: string,
  frontmatter: Frontmatter
): Promise<string> => {
  const parsedMd = rawMarkdown.replaceAll(
    /\{(.*?)\}/g,
    (_, substring: string) => {
      const indexes = substring.split('.');
      let value: FrontmatterValue = frontmatter[indexes.shift() ?? ''];
      for (const index of indexes) {
        if (typeof value === 'object') {
          value = value[index];
        }
      }

      return value.toString();
    }
  );

  return (await renderMarkdown(parsedMd, {})).code;
};
