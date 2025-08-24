import type { SgRoot } from "codemod:ast-grep";
import type TSX from "codemod:ast-grep/langs/tsx";

async function transform(root: SgRoot<TSX>): Promise<string> {
  const rootNode = root.root();
  
  let sourceText = rootNode.text();
  
  // Handle various cases of _experiments transformation
  // Match _experiments with both enableLogs and beforeSendLog
  sourceText = sourceText.replace(
    /_experiments:\s*{\s*enableLogs:\s*([^,}]+),\s*beforeSendLog:\s*([^}]*(?:\{[^}]*\})?[^}]*)\s*,?\s*},?/gm,
    'enableLogs: $1,\n    beforeSendLog: $2,'
  );
  
  return sourceText;
}

export default transform;