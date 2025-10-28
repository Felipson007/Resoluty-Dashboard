/**
 * Declarações de tipos para Google API Client Library
 */

declare namespace gapi {
  function load(api: string, callback: () => void): void;
  const client: {
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
  namespace accounts {
    namespace oauth2 {
      interface TokenResponse {
        access_token: string;
        expires_in: number;
        error?: string;
      }
      
      interface TokenClient {
        requestAccessToken: () => void;
      }
      
      function initTokenClient(config: any): TokenClient;
      function revoke(token: string): void;
    }
  }
}
 