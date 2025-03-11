interface ContentData {
  category: string;
  tags: string[];
  goalTime: number;
}

declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { className?: string } & { alt?: string }
  >;
  export default ReactComponent;
}
declare module "cosine-similarity" {
  function cosineSimilarity(vec1: number[], vec2: number[]): number;
  export = cosineSimilarity;
}
