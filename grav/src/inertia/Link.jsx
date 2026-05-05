import { buildUrl, router } from './router';

export default function Link({
  href,
  data,
  method = 'get',
  as: Component = 'a',
  disabled = false,
  options = {},
  onClick,
  children,
  ...props
}) {
  const linkHref = method === 'get' ? buildUrl(href, data) : href;

  const handleClick = (event) => {
    onClick?.(event);

    if (disabled) {
      event.preventDefault();
      return;
    }

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();

    if (method === 'get') {
      router.get(href, data, options);
      return;
    }

    router[method]?.(href, data, options);
  };

  return (
    <Component
      {...props}
      href={Component === 'a' ? linkHref : undefined}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
}
