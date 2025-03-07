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
