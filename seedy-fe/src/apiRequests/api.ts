// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiResponse<T> {
  statusCode: number;
  title: string;
  type: string;
  extensions: {
    data: {
      data: T;
    };
  };
}
