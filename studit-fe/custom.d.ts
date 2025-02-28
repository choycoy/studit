declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { className?: string } & { alt?: string }
    >;
    export default ReactComponent;
  }
  