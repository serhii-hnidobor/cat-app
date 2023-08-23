import { MutableRefObject } from "react";

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}

interface IsNeedLoadMoreProps<ContainerElement extends HTMLElement>
  extends Omit<Props, "loadMore"> {
  container: ContainerElement;
}

interface OnScrollProps<ContainerElement extends HTMLElement>
  extends Omit<IsNeedLoadMoreProps<ContainerElement>, "container"> {
  loadMore: () => void;
  containerRef: MutableRefObject<ContainerElement | null>;
}

const isNeedLoadMore = <ContainerElement extends HTMLElement>({
  container,
  hasMore,
  isLoading,
}: IsNeedLoadMoreProps<ContainerElement>) =>
  container.scrollTop === container.scrollHeight - container.offsetHeight &&
  hasMore &&
  !isLoading;

const handleInfiniteScroll = <ContainerElement extends HTMLElement>({
  containerRef,
  hasMore,
  isLoading,
  loadMore,
}: OnScrollProps<ContainerElement>) => {
  containerRef?.current &&
    isNeedLoadMore({ container: containerRef?.current, hasMore, isLoading }) &&
    loadMore();
};

function infiniteScroll<ContainerElement extends HTMLElement>(
  props: OnScrollProps<ContainerElement>
) {
  return () => handleInfiniteScroll(props);
}

export { infiniteScroll as default };
