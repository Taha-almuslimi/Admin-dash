import { createContext, useContext } from 'react';

export const PageContext = createContext({
  component: null,
  props: {},
  url: '/',
});

export function usePage() {
  return useContext(PageContext);
}
