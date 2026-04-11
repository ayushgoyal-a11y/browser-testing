interface CustomGlobal extends Global {
  messages: any[];
  pageInstance: any;
  browserInstance: any;
}

declare const global: CustomGlobal;
