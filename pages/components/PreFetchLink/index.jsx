import { withRouter } from 'next/router';

function PreFetchLink({ router, href, children }) {

  (function preFetchPages() {
    if(typeof window !== "undefined") {
      router.prefetch(router.pathname)
    }
  })();

  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  }
  return (
    <div>
      <a href={href} onClick={handleClick} style={{
        textDecoration: 'none',
        margin: 0,
        padding: 0
      }}>
        {children}
      </a>
    </div>
  );
}

export default withRouter(PreFetchLink);