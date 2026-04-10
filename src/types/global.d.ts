interface CustomGlobal extends Global {
  messages: any[];
  pageInstance: any;
  lastMessage: any;
  lastError: any;
  END: number;
  browserInstance: any;
  uiid?: string;
}

declare const global: CustomGlobal;
