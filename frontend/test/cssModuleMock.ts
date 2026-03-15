// Returns a Proxy that maps any property access to the property name itself.
// e.g. styles.danger === 'danger', styles.info === 'info'
// This makes dynamic CSS Module lookups like styles[kind] work in tests.
export default new Proxy(
  {},
  {
    get(_target, prop) {
      if (typeof prop === 'string') {
        return prop;
      }

      return undefined;
    },
  }
);
