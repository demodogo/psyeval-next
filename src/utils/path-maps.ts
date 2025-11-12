export function getAllowedPaths(role: string | null) {
  switch (role) {
    case 'admin':
      return ['/dashboard', '/dashboard/usuarios'];
    case 'participant':
      return ['/evaluaciones/welcome', '/evaluaciones/test'];
    case 'evaluator':
      return ['/dashboard', '/dashboard/evaluaciones'];
  }

  return ['/', '/participant/access', '/onboarding'];
}
