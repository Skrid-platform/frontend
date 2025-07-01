// src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'verovio' {
    const verovio: any;
    export default verovio;
}

declare module '@/lib/stave.js' {
    const StaveRepresentation: any;
    export default StaveRepresentation;
}