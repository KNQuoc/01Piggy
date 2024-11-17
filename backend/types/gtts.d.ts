declare module "gtts" {
    export default class Gtts {
      constructor(text: string, lang?: string);
      save(outputPath: string, callback: (err?: Error) => void): void;
    }
  }
  