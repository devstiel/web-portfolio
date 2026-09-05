"use client";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { portfolioAnswer } from "@/data/portfolioAnswers";
import styles from "./PortfolioTerminal.module.css";

type Entry = { id: number; command: string; answer: string };
const shortcuts = ["about", "work", "experience", "skills", "contact", "cv"];

function Answer({ text }: { text: string }) {
  // Make only the known local work and CV paths clickable. External contacts
  // remain selectable text; no HTML is interpreted from terminal input.
  return (
    <>
      {text.split("\n").map((line, index) => (
        <span key={index}>
          {line.startsWith("/work/") || line.startsWith("CV: /") ? (
            <a href={line.replace("CV: ", "")}>{line}</a>
          ) : (
            line
          )}
          {"\n"}
        </span>
      ))}
    </>
  );
}

export default function PortfolioTerminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const nextId = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries]);

  function run(raw: string) {
    const command = raw.trim().slice(0, 500);
    if (!command) return;
    setHistory((current) => [...current, command].slice(-50));
    setHistoryIndex(null);
    if (command.toLowerCase() === "clear") {
      setEntries([]);
      setAnnouncement("Terminal cleared.");
    } else {
      const answer = portfolioAnswer(command);
      const id = nextId.current++;
      setEntries((current) => [...current, { id, command, answer }].slice(-30));
      setAnnouncement(answer);
    }
    setInput("");
    inputRef.current?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(input);
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      const index =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : null);
      setInput(history[index] ?? "");
    } else if (event.key === "Escape") {
      setInput("");
      setHistoryIndex(null);
    }
  }

  return (
    <div className={styles.terminal}>
      <div className={styles.titleBar}>
        <span>devy / a small portfolio index</span>
        <span aria-hidden="true">↳</span>
      </div>
      <div
        className={styles.log}
        ref={logRef}
        role="region"
        aria-label="Terminal output"
        tabIndex={0}
      >
        <p className={styles.welcome}>
          Hello, keyboard person.
          <br />
          <span>Type a command, or pick one below. Start with help.</span>
        </p>
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            <p className={styles.command}>
              <span aria-hidden="true">→ </span>
              {entry.command}
            </p>
            <pre>
              <Answer text={entry.answer} />
            </pre>
          </div>
        ))}
      </div>
      <p className="sr-only" role="status">
        {announcement}
      </p>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor="portfolio-command">
          devy / <span aria-hidden="true">→</span>
        </label>
        <input
          id="portfolio-command"
          aria-label="Portfolio command"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          maxLength={500}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Try ‘work’"
        />
        <button type="submit" aria-label="Run command">
          ↵
        </button>
      </form>
      <div className={styles.shortcuts} aria-label="Command shortcuts">
        {shortcuts.map((command) => (
          <button type="button" key={command} onClick={() => run(command)}>
            {command}
          </button>
        ))}
        <button type="button" onClick={() => run("clear")}>
          clear
        </button>
      </div>
    </div>
  );
}
