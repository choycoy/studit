import cosineSimilarity from "cosine-similarity";

interface ContentData {
  category: string;
  tags: string[];
}

class Content {
  category: string;
  tags: string[];

  constructor(category: string, tags: string[]) {
    this.category = category;
    this.tags = tags;
  }

  private getAllTokens(corpus: string[]): string[] {
    const tokenSet = new Set<string>();
    corpus.forEach((doc) => {
      doc.split(/\s+/).forEach((token) => tokenSet.add(token));
    });
    return Array.from(tokenSet);
  }

  private getTFIDFVector(doc: string, corpus: string[], allTokens: string[]): number[] {
    const tokens = doc.split(/\s+/);
    const termFrequency: { [key: string]: number } = {};
    const documentFrequencies: { [key: string]: number } = {};

    tokens.forEach((token) => {
      termFrequency[token] = (termFrequency[token] || 0) + 1;
    });

    corpus.forEach((corpusDoc) => {
      const uniqueTokens = new Set(corpusDoc.split(/\s+/));
      uniqueTokens.forEach((token) => {
        documentFrequencies[token] = (documentFrequencies[token] || 0) + 1;
      });
    });

    const numDocuments = corpus.length;
    return allTokens.map((token) => {
      const tf = termFrequency[token] ? termFrequency[token] / tokens.length : 0.001;
      const idf = Math.log((numDocuments + 1) / (1 + documentFrequencies[token])) + 1;
      return tf * idf;
    });
  }

  private calculateTextualSimilarity(otherContent: Content): number {
    const corpus = [
      this.category + " " + this.tags.join(" "),
      otherContent.category + " " + otherContent.tags.join(" "),
    ];
    const allTokens = this.getAllTokens(corpus);
    const vector1 = this.getTFIDFVector(corpus[0], corpus, allTokens);
    const vector2 = this.getTFIDFVector(corpus[1], corpus, allTokens);
    return cosineSimilarity(vector1, vector2);
  }

  private calculateCategorySimilarity(otherContent: Content): number {
    if (this.category === otherContent.category) return 1;
    if (this.category.includes(otherContent.category) || otherContent.category.includes(this.category)) return 0.7;
    return 0.3;
  }

  private calculateTagSimilarity(otherContent: Content): number {
    const matchingTags = this.tags.filter((tag) => otherContent.tags.includes(tag));
    return matchingTags.length / Math.max(this.tags.length, otherContent.tags.length);
  }

  public calculateOverallSimilarity(otherContent: Content): number {
    const textSimilarity = this.calculateTextualSimilarity(otherContent);
    const categorySimilarity = this.calculateCategorySimilarity(otherContent);
    const tagSimilarity = this.calculateTagSimilarity(otherContent);

    return 0.1 * textSimilarity + 0.1 * categorySimilarity + 0.8 * tagSimilarity;
  }
}

onmessage = function (event) {
  const { targetContentData, contentsData } = event.data;
  const contents = contentsData.map((data: ContentData) => new Content(data.category, data.tags));
  const targetContent = new Content(targetContentData.category, targetContentData.tags);

  const results = contents
    .map((content: Content) => {
      const similarity = targetContent.calculateOverallSimilarity(content);
      return { content, similarity };
    })
    .sort(
      (a: { content: Content; similarity: number }, b: { content: Content; similarity: number }) =>
        b.similarity - a.similarity,
    )
    .slice(0, 5)
    .map((result: { content: Content; similarity: number }) => result.content);

  postMessage(results);
};
