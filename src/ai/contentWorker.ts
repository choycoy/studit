import cosineSimilarity from "cosine-similarity";

interface ContentData {
  category: string;
  tags: string[];
  goalTime: number;
}

class Content {
  category: string;
  tags: string[];
  goalTime: number;

  constructor(category: string, tags: string[], goalTime: number) {
    this.category = category;
    this.tags = tags;
    this.goalTime = goalTime;
  }

  private static readonly TOKENIZER_REGEX = /[^a-zA-Z0-9가-힣 ]/g;

  private tokenize(text: string): string[] {
    return text.toLowerCase().replace(Content.TOKENIZER_REGEX, "").split(/\s+/);
  }

  private getAllTokens(corpus: string[]): string[] {
    const tokenSet = new Set<string>();
    corpus.forEach((doc) => {
      this.tokenize(doc).forEach((token) => tokenSet.add(token));
    });
    return Array.from(tokenSet);
  }

  private getTFIDFVector(doc: string, corpus: string[], allTokens: string[]): number[] {
    const tokens = this.tokenize(doc);
    const termFrequency: { [key: string]: number } = {};
    const documentFrequencies: { [key: string]: number } = {};

    tokens.forEach((token) => {
      termFrequency[token] = (termFrequency[token] || 0) + 1;
    });

    corpus.forEach((corpusDoc) => {
      const uniqueTokens = new Set(this.tokenize(corpusDoc));
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

  private normalizeGoalTime(goalTime: number, minGoalTime: number, maxGoalTime: number): number {
    return minGoalTime === maxGoalTime ? 1 : (goalTime - minGoalTime) / (maxGoalTime - minGoalTime);
  }

  private calculateGoalTimeSimilarity(otherContent: Content, minGoalTime: number, maxGoalTime: number): number {
    const normGoalTime1 = this.normalizeGoalTime(this.goalTime, minGoalTime, maxGoalTime);
    const normGoalTime2 = this.normalizeGoalTime(otherContent.goalTime, minGoalTime, maxGoalTime);
    return 1 - Math.abs(normGoalTime1 - normGoalTime2);
  }

  private calculateCategorySimilarity(otherContent: Content): number {
    if (this.category === otherContent.category) return 1;
    if (this.category.includes(otherContent.category) || otherContent.category.includes(this.category)) return 0.7;
    return 0.3;
  }

  public calculateOverallSimilarity(otherContent: Content, minGoalTime: number, maxGoalTime: number): number {
    const textSimilarity = this.calculateTextualSimilarity(otherContent);
    const goalTimeSimilarity = this.calculateGoalTimeSimilarity(otherContent, minGoalTime, maxGoalTime);
    const categorySimilarity = this.calculateCategorySimilarity(otherContent);
    return 0.6 * textSimilarity + 0.1 * goalTimeSimilarity + 0.3 * categorySimilarity;
  }
}

onmessage = function (event) {
  const { targetContentData, contentsData } = event.data;

  const contents = contentsData.map((data: ContentData) => new Content(data.category, data.tags, data.goalTime));

  const targetContent = new Content(targetContentData.category, targetContentData.tags, targetContentData.goalTime);
  const minGoalTime = Math.min(...contents.map((c: ContentData) => c.goalTime));
  const maxGoalTime = Math.max(...contents.map((c: ContentData) => c.goalTime));

  const results = contents
    .map((content: Content) => {
      const similarity = targetContent.calculateOverallSimilarity(content, minGoalTime, maxGoalTime);
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
