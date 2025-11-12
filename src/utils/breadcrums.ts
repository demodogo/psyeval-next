import { navItems } from './nav-items';

export function getBreadcrumbs(segments: any) {
  const normalize = (s: any) =>
    String(s || '')
      .normalize?.('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const findNav = (segment: any) => {
    const seg = String(segment);
    return navItems.find((n) => n.slug === seg || n.href?.endsWith(`/${seg}`) || normalize(n.label || '') === normalize(seg));
  };

  const resolveLabel = (segment: any) => {
    if (!segment) return '';
    const nav = findNav(segment);
    if (nav?.label) return nav.label;
    return decodeURIComponent(String(segment));
  };

  return segments.map((segment: any, index: any) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    if (segment === 'crear') {
      const parent = segments[index - 1];
      const parentNav = parent ? findNav(parent) : undefined;
      const parentLabel = parentNav?.label || resolveLabel(parent);
      return {
        href,
        label: parentLabel ? `Crear ${parentLabel.toLowerCase()}` : 'Crear',
      };
    }

    if (segment === 'editar') {
      const parent = segments[index - 1];
      const parentNav = parent ? findNav(parent) : undefined;
      const parentLabel = parentNav?.label || resolveLabel(parent);
      return {
        href,
        label: parentLabel ? `Editar ${parentLabel.toLowerCase()}` : 'Editar',
      };
    }

    const nav = findNav(segment);

    if (!nav) {
      const parent = segments[index - 1];
      const parentNav = parent ? findNav(parent) : undefined;
      if (parentNav && index === segments.length - 1) {
        const single = parentNav.single_label || parentNav.label || '';
        return {
          href,
          label: `Detalle ${single.toLowerCase()}`,
        };
      }
    }

    return {
      href,
      label: nav?.label || resolveLabel(segment),
    };
  });
}
