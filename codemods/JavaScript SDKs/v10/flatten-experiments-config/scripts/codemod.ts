import type { SgRoot, SgNode, Edit } from "@codemod.com/jssg-types/main";
import type TSX from "codemod:ast-grep/langs/tsx";

// Function to detect indentation from existing code
function detectIndentation(text: string): string {
  const lines = text.split('\n');
  
  // Look for object property lines to detect indentation
  for (const line of lines) {
    // Look for lines that start with a property (word: or "word":)
    const propertyMatch = line.match(/^(\s+)(["\w]+)\s*:/);
    if (propertyMatch && propertyMatch[1]) {
      return propertyMatch[1];
    }
  }
  
  // Default fallback to 2 spaces
  return '  ';
}

// Function to apply consistent indentation to a property
function applyIndentation(propertyText: string, baseIndent: string): string {
  const lines = propertyText.split('\n');
  
  return lines.map((line, index) => {
    if (index === 0) {
      // First line: use the base indentation
      return baseIndent + line.trim();
    } else {
      // Subsequent lines: add base indentation + any existing indentation
      const trimmedLine = line.trim();
      if (trimmedLine === '') {
        return baseIndent; // Empty line, just return base indent
      }
      return baseIndent + trimmedLine;
    }
  }).join('\n');
}

// Function to format a property with proper indentation
function formatProperty(property: SgNode, baseIndent: string): string {
  const propertyText = property.text();
  const lines = propertyText.split('\n');
  
  if (lines.length === 1) {
    // Single line property - just apply base indentation
    return baseIndent + lines[0].trim();
  }
  
  // Multi-line property - normalize indentation to use consistent 2-space increments
  return lines.map((line, index) => {
    if (line.trim() === '') {
      // Empty line - just return base indentation
      return baseIndent;
    }
    
    if (index === 0) {
      // First line: use the base indentation
      return baseIndent + line.trim();
    } else {
      // For subsequent lines, calculate proper indentation based on original structure
      const currentLineIndent = line.match(/^(\s*)/)?.[1] || '';
      const contentAfterIndent = line.slice(currentLineIndent.length);
      
      // The first line is the property name, so we need to calculate indentation
      // relative to the expected property body indentation (2 spaces from property name)
      const actualIndent = currentLineIndent.length;
      
      // Calculate how many 2-space levels this line is indented
      // Subtract 4 because the original code has 4 extra spaces that we don't want
      const indentLevels = Math.max(0, Math.floor((actualIndent - 4) / 2));
      
      // Apply base indentation + calculated relative indentation + original content
      const relativeIndent = '  '.repeat(indentLevels);
      return baseIndent + relativeIndent + contentAfterIndent;
    }
  }).join('\n');
}

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

    // Detect indentation from the existing config object
    const configText = configArg.text();
    const baseIndent = detectIndentation(configText);
    
    
    // Create a new config object without _experiments but with flattened properties
    const otherPairs = pairs.filter(pair => pair !== experimentsProperty);
    
    // Format all properties with consistent indentation
    const formattedOtherPairs = otherPairs.map(pair => formatProperty(pair, baseIndent));
    const formattedExperimentsProperties = experimentsProperties.map(prop => formatProperty(prop, baseIndent));
    
    // Combine all properties: other pairs + flattened experiments properties
    const allFormattedPairs = [...formattedOtherPairs, ...formattedExperimentsProperties];
    
    // Add commas to all properties
    const allFormattedPairsWithCommas = allFormattedPairs.map(pair => pair + ',');
    
    // Create the new config object text with detected indentation
    const newConfigText = `{\n${allFormattedPairsWithCommas.join(`\n`)}\n}`;
    
    // Replace the entire config object
    edits.push(configArg.replace(newConfigText));
  }

  if (edits.length === 0) {
    return null; // No changes needed
  }

  return rootNode.commitEdits(edits);
}

export default transform;