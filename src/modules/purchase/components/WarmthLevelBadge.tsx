import styles from "./warmthLevelBadge.module.css";

interface WarmthLevelBadgeProps {
  level: number; 
  className?: string; 
}

export const WarmthLevelBadge = ({ level, className = "" }: WarmthLevelBadgeProps) => {
  const MAX_LEVELS = [1, 2, 3];

  return (
    <div 
      className={`${styles.badgeContainer} ${className}`} 
      title={`Nivel de calor: ${level}/3`}
    >
      {MAX_LEVELS.map((idx) => (
        <i
          key={idx}
          className={`bi bi-fire ${styles.fireIcon} ${
            idx <= level ? styles.fireActive : styles.fireInactive
          }`}
        />
      ))}
    </div>
  );
};