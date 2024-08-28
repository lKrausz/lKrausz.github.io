import ErrorComponent from "./ErrorComponent";

export type Payload = Array<unknown>;

type NonNullableArray<Array extends Payload> = {
  [K in keyof Array]: NonNullable<Array[K]>;
};

type FetcherProps<T extends Payload> = {
  payload: [...T];
  loading: boolean;
  error: boolean;
  loader: React.ReactNode;
  onReload: () => void;
  render: (payload: NonNullableArray<T>) => JSX.Element;
};

const isNonNullableArray = <T extends Payload>(
  array: T
): array is NonNullableArray<T> => {
  return array.every((item) => item != null);
};

const Fetcher = <T extends Payload>({
  payload,
  loading,
  loader,
  error,
  onReload,
  render,
}: FetcherProps<T>) => {
  if (loading) return loader;

  if (error) return <ErrorComponent onReload={onReload} />;

  if (!isNonNullableArray(payload)) throw new Error("Unexpected error");

  return render(payload);
};

export default Fetcher;
