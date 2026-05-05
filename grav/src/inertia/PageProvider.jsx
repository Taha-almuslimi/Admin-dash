import { PageContext } from './pageContext';

export default function PageProvider({ page, children }) {
  return (
    <PageContext.Provider value={page}>
      {children}
    </PageContext.Provider>
  );
}
