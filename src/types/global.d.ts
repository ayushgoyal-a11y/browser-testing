interface CustomGlobal extends Global {
  messages: any[];
  lastMessage: any;
  lastError: any;
  END: number;
  uiid?: string;
}

declare const global: CustomGlobal;
