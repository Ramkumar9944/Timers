import Button from "./UI/Button";
import { useTimersContext } from "../store/timers-context";

export default function Header() {
  const timersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timersCtx.isRunning ? timersCtx.stopTimer : timersCtx.startTimer
        }
      >
        {timersCtx.isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
}
