/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_MOCK: boolean
    // 更多环境变量...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }