import { TimerType } from "@/types/interface";
import LightOffIcon from "@/assets/icons/light-off.svg";
import LightOnIcon from "@/assets/icons/light-on.svg";
import LeaderIcon from "@/assets/icons/leader.svg";
import { formatTime } from "@/utils/commonUtils";

export default function GroupTimers({
  timers,
  leaderId,
  userId,
}: {
  timers: TimerType[];
  leaderId: number;
  userId: number;
}) {
  return (
    <section className="grid h-[254px] grid-cols-4 gap-x-4 px-4">
      {timers.map((timer: TimerType) => {
        const isLeader = leaderId === timer.userId;
        const savedData = localStorage.getItem("activeTodo") && timer.userId === userId;
        return (
          <div className="relative flex flex-col items-center text-sm" key={timer.userId}>
            {isLeader && <LeaderIcon className="absolute -top-1 right-1.5 h-4 w-4" alt="스터디장" />}
            {timer.isRunning || savedData ? (
              <LightOnIcon alt={timer.nickname + "타이머 측정 하지 않는 중"} />
            ) : (
              <LightOffIcon alt={timer.nickname + "타이머 측정 중"} />
            )}
            <span className="whitespace-nowrap">{timer.nickname}</span>
            <span className="text-xs font-medium">{formatTime(timer.timerTime)}</span>
          </div>
        );
      })}
    </section>
  );
}
