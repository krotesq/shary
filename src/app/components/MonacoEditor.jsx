"use client"

import Editor from "@monaco-editor/react";

export default function MonacoEditor({ code }) {
  return (
      <Editor
      height="30rem"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={{
        inlineSuggest: true,
        fontSize: "14px",
        formatOnType: true,
        autoClosingBrackets: true,
        minimap: { scale: 2 }
      }}
    />
  )
}