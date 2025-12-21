export default {
  meta: {
    type: "layout",
    docs: {
      description: "Check imports to sort them by groups",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    function getImportDepth(path) {
      if (!path.startsWith(".")) return 0; // external
      if (path.startsWith("./")) return 1; // local
      return 3; // deep
    }

    function getImportName(importNode) {
      if (importNode.specifiers.length > 0) {
        const specifier = importNode.specifiers[0];
        if (specifier.type === "ImportDefaultSpecifier") {
          return specifier.local.name;
        } else if (specifier.type === "ImportNamespaceSpecifier") {
          return specifier.local.name;
        } else if (specifier.type === "ImportSpecifier") {
          return specifier.imported.name;
        }
      }
      return "";
    }

    function compareImports(a, b) {
      const depthA = getImportDepth(a.source.value);
      const depthB = getImportDepth(b.source.value);

      if (depthA !== depthB) {
        return depthA - depthB;
      }

      const nameA = getImportName(a);
      const nameB = getImportName(b);
      return nameA.localeCompare(nameB);
    }

    return {
      Program(node) {
        const imports = node.body.filter((n) => n.type === "ImportDeclaration");

        if (imports.length < 2) return;

        // Проверяем порядок
        for (let i = 1; i < imports.length; i++) {
          if (compareImports(imports[i - 1], imports[i]) > 0) {
            context.report({
              node,
              message: "Imports are not sorted by groups",
              fix(fixer) {
                const sorted = [...imports].sort(compareImports);
                const fixes = [];

                // Заменяем все импорты
                imports.forEach((imp, index) => {
                  fixes.push(
                    fixer.replaceText(
                      imp,
                      context.getSourceCode().getText(sorted[index])
                    )
                  );
                });

                return fixes;
              },
            });
            return;
          }
        }
      },
    };
  },
};
