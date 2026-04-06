type CrestIconProps = {
  className?: string;
};

export function CrestIcon({ className }: CrestIconProps) {
  return (
    <svg
      viewBox="0 0 76 96"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 3L60 9C64.5 10.2 68 13.9 68 18.6V41.7C68 58.7 57.2 74.1 41.1 80.1L38 81.3L34.9 80.1C18.8 74.1 8 58.7 8 41.7V18.6C8 13.9 11.5 10.2 16 9L38 3Z"
        fill="#D8C6A4"
        stroke="#14171B"
        strokeWidth="4"
      />
      <path d="M12 20H64" stroke="#14171B" strokeWidth="4" />
      <path d="M12 35H64" stroke="#14171B" strokeWidth="4" />
      <path d="M38 7V78" stroke="#14171B" strokeWidth="4" />
      <path d="M12 20H38V35H12V20Z" fill="#B63B2A" />
      <path d="M38 20H64V35H38V20Z" fill="#1B1D21" />
      <path d="M12 35H38V50H12V35Z" fill="#1B1D21" />
      <path d="M38 35H64V50H38V35Z" fill="#B63B2A" />
      <circle cx="38" cy="58" r="11" fill="#D8C6A4" stroke="#14171B" strokeWidth="4" />
      <path
        d="M34.2 61.6L37.4 53.7L41.6 63.7L44 57.8"
        stroke="#14171B"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
