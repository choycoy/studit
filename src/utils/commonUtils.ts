export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("ko-KR", options);
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function handleMaxLengthChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  maxLength: number,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
) {
  const newValue = e.target.value;
  if (newValue.length <= maxLength) onChange(e);
}

export function handleKeyDown(
  e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>,
  onButtonClick: () => void,
) {
  if (e.key === "Enter") {
    e.preventDefault();
    onButtonClick();
  }
}

export function toMonthDay(date: string): string {
  const [, month, day] = date.split(".");
  const monthNumber = parseInt(month);
  const dayNumber = parseInt(day);
  return `${monthNumber}월 ${dayNumber}일`;
}

export function formatTimeToAMPM(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "오후" : "오전";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${hour12}:${minute < 10 ? "0" + minute : minute}`;
}
