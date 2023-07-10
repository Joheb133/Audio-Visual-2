interface LoadingProp {
  fill?: string;
  size?: number;
}

export default function Loading({ fill = "black", size = 10 }: LoadingProp) {
  return (
    <svg
      fill={fill}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size * 10}px`}
      height={`${size * 10}px`}
    >
      <circle cx="10" cy="50" r="10">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle cx="50" cy="50" r="10">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle cx="90" cy="50" r="10">
        <animate
          attributeName="opacity"
          dur="1.5s"
          values="0;1;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
}
