import type { H3Event, EventHandlerRequest } from 'h3';

function setRange(event: H3Event<EventHandlerRequest>, perPage = 10) {
  const { page } = getQuery(event);
  const pageFromRoute = page ? parseInt(page as string) : 1;
  const index = pageFromRoute > 1 ? pageFromRoute - 1 : 0;
  const start = index * perPage;
  const end = start + perPage - 1;
  return {
    start,
    end,
  };
}

export { setRange };
