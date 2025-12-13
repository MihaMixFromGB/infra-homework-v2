module.exports = {
  name: `plugin-duplicates-list`,
  factory: (require) => {
    const { BaseCommand, getPluginConfiguration } = require(`@yarnpkg/cli`);
    const { Configuration, Project, structUtils } = require("@yarnpkg/core");
    const { npath } = require("@yarnpkg/fslib");

    class DuplicatesCommand extends BaseCommand {
      static paths = [[`duplicates`]];

      async execute() {
        // Get cwd and configuration
        const cwd = this.context.cwd;
        const startingCwd = npath.toPortablePath(cwd);
        const configuration = await Configuration.find(startingCwd, getPluginConfiguration());

        // Get project
        const { project } = await Project.find(configuration, startingCwd);
        
        // Restore install state
        await project.restoreInstallState();

        // Filter virtual packages
        const storedPackages = Array.from(project.storedPackages.values()).filter(
              (pkg) => !structUtils.isVirtualLocator(pkg)
            );

        // Iterate over storedPackages and find duplicates
        const duplicates = {};
        for (const pkg of storedPackages) {
          const { name } = pkg;
          if (duplicates[name]) {
            duplicates[name].push(pkg.version);
          } else {
            duplicates[name] = [pkg.version];
          }
        }

        // Print duplicates
        for (const [name, versions] of Object.entries(duplicates)) {
          if (versions.length > 1) {
            this.context.stdout.write(`${name}: ${versions.join(' ')}\n`);
          }
        }
      }
    }

    return {
      commands: [
        DuplicatesCommand,
      ]
    }
  },
};
