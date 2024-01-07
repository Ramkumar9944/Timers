import { createContext, useContext, type ReactNode, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

type TimersContextProvider = {
  children: ReactNode;
};

type StartTimer = {
  type: "START";
};
type StopTimer = {
  type: "STOP";
};
type AddTimer = {
  type: "ADD";
  payload: Timer;
};

type Action = StartTimer | StopTimer | AddTimer;

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

const timersReducer = (state: TimersState, action: Action): TimersState => {
  if (action.type === "START") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD") {
    return {
      ...state,
      timers: [
        ...state.timers,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  return state;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export const useTimersContext = () => {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null) {
    throw new Error("Something went wrong!");
  }
  return timersCtx;
};

const TimerContextProvider = ({ children }: TimersContextProvider) => {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);
  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START" });
    },
    stopTimer() {
      dispatch({ type: "STOP" });
    },
  };
  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
};

export default TimerContextProvider;
