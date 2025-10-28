import React from 'react';

interface GitHubIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const GitHubIcon: React.FC<GitHubIconProps> = ({
  width = 24,
  height = 24,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="GitHub"
    >
      <path d="M12 2.5c-1.5 0-2.8.5-3.9 1.4-.6-.2-1.3-.4-2-.4-.7 0-1.4.2-2 .5C2.9 3.5 2 2.5 2 2.5s-.3.8-.3 2c0 1.2.3 2.2.8 3 0 0-.5.8-.5 2.5 0 3.5 2 5.5 5 6.5v3c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3c3-1 5-3 5-6.5 0-1.7-.5-2.5-.5-2.5.5-.8.8-1.8.8-3 0-1.2-.3-2-.3-2s-.9 1-2.1 1.5c-.6-.3-1.3-.5-2-.5-.7 0-1.4.2-2 .4-1.1-.9-2.4-1.4-3.9-1.4z" />
    </svg>
  );
};

export default GitHubIcon; 