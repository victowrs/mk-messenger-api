export interface WppInitResponse {
  error: boolean;
  message: string;
  key: string;
  webhook: {
    enabled: boolean;
    webhookUrl: string | null;
  };
  qrcode: {
    url: string;
  };
  browser: {
    platform: string;
    browser: string;
    version: string;
  };
}

export interface Instances {
  instance_key: string,
  phone_connected?: boolean,
  webhookUrl: string | null,
  user: {
    id?: string,
  },
}

export interface WppSessionResponse {
  error: boolean;
  message: string;
  data: Instances[]
}
