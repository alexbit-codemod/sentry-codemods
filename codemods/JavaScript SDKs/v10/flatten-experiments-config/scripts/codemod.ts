import type { SgRoot, SgNode, Edit } from "@codemod.com/jssg-types/main";
import type TSX from "codemod:ast-grep/langs/tsx";

async function transform(root: SgRoot<TSX>): Promise<string | null> {
  const rootNode = root.root();
  const edits: Edit[] = [];

  // Find all Sentry.init() calls
  const sentryInitCalls = rootNode.findAll({
    rule: {
      pattern: "Sentry.init($CONFIG)",
    },
  });

  for (const initCall of sentryInitCalls) {
    const configArg = initCall.getMatch("CONFIG");
    
    if (!configArg?.is("object")) {
      continue; // Skip if config is not an object
    }

    // Get direct children and filter for pairs
    const children = configArg.children();
    const pairs = children.filter(child => child.is("pair"));

    // Find the _experiments pair
    const experimentsProperty = pairs.find(pair => {
      const property = pair.child(0);
      return property?.text() === "_experiments";
    });

    if (!experimentsProperty) {
      continue; // No _experiments property found
    }

    const experimentsValue = experimentsProperty.child(2);
    
    if (!experimentsValue?.is("object")) {
      continue; // Skip if _experiments is not an object
    }

    // Get all properties from the _experiments object
    const experimentsChildren = experimentsValue.children();
    const experimentsProperties = experimentsChildren.filter(child => 
      child.is("pair")
    );
    
    if (experimentsProperties.length === 0) {
      continue; // No properties to flatten
    }

    // Find the position where to insert the flattened properties
    const experimentsIndex = pairs.findIndex(pair => pair === experimentsProperty);

    if (experimentsIndex === -1) {
      continue; // Couldn't find _experiments in properties
    }

    // Create a new config object without _experiments but with flattened properties
    const otherPairs = pairs.filter(pair => pair !== experimentsProperty);
    
    // Format the flattened properties with proper indentation
    const flattenedProperties = experimentsProperties
      .map(prop => {
        const propText = prop.text();
        // Add proper indentation (assuming 2 spaces)
        return propText.split('\n').map((line: string, index: number) => 
          index === 0 ? line : '  ' + line
        ).join('\n');
      });

    // Combine all properties: other pairs + flattened experiments properties
    const allNewPairs = [...otherPairs, ...experimentsProperties];
    
    // Create the new config object text
    const newConfigText = `{\n  ${allNewPairs.map(pair => pair.text()).join(',\n  ')}\n}`;
    
    // Replace the entire config object
    edits.push(configArg.replace(newConfigText));
  }

  if (edits.length === 0) {
    return null; // No changes needed
  }

  return rootNode.commitEdits(edits);
}

export default transform;