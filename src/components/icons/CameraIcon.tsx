import { type IconProps } from "./";

export function CameraIcon({ size = 26, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_camera_icon)">
        <path
          d="M8.6665 24.9166V20.5833"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.3335 24.9166V20.5833"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.75 24.9167L3.25 24.9167"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 5.14581C15.2436 5.14581 17.0625 6.96473 17.0625 9.20831C17.0625 11.4519 15.2436 13.2708 13 13.2708C10.7564 13.2708 8.9375 11.4519 8.9375 9.20831C8.9375 6.96473 10.7564 5.14581 13 5.14581Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.9731 16.25C12.7489 16.25 12.5669 16.432 12.5669 16.6562C12.5669 16.8805 12.7489 17.0625 12.9731 17.0625C13.1974 17.0625 13.3794 16.8805 13.3794 16.6562C13.3794 16.432 13.1974 16.25 12.9731 16.25Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3.1875"
          y="0.75"
          width="19.625"
          height="19.625"
          rx="3.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_camera_icon">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
