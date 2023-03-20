export class CreateArticleDto {
  readonly title: string;
  readonly subtitle: string;
  readonly image: string;
  readonly views: number;
  readonly type: string;
  readonly userId: number;
  readonly content: string;
}
