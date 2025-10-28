/**
 * Declarações de tipos para Google API Client Library
 */

declare namespace gapi {
  export function load(api: string, callback: () => void): void;
  export function client: {
    init: (config: any) => Promise<void>;
    getToken: () => any;
    setToken: (token: any) => void;
    sheets: {
      spreadsheets: {
        values: {
          get: (params: any) => Promise<any>;
          update: (params: any) => Promise<any>;
          append: (params: any) => Promise<any>;
        };
      };
    };
  };
}

declare namespace google {
  export namespace accounts {
    export namespace oauth2 {
      export interface TokenResponse {
        access_token: string;
        expires_in: number;
        error?: string;
      }
      
      export interface TokenClient {
        requestAccessToken: () => void;
      }
      
      export function initTokenClient(config: any): TokenClient;
      export function revoke(token: string): void;
    }
  }
}
 