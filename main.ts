// Worst Fix Ever: Funniest Commit Message — one-line commit message for a
// bug fix that made everything worse. The program writes exactly one line
// of text to /output/entry.txt. The text is a fixed string: no randomness,
// no clock, no input — every run produces byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke: a fix for data loss that destroys the database itself — the
// repair breaks exactly what it was meant to protect, and the punchline
// ("nothing left to lose") lands at the end, in the flat voice of a tired
// engineer typing a real commit subject line at 3 a.m.
const ENTRY =
  "fix: stopped the data loss by deleting the database; nothing left to lose";

// Runtime validation mirroring the sealed gate: /output/entry.txt must be
// UTF-8 text of 1 to 100 characters, not only white space, on a single line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 100) {
  throw new Error(`entry is ${chars.length} characters, outside the 1-100 gate`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must stay on one line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Read back and confirm the file holds exactly the validated text.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not hold the entry text");
}
