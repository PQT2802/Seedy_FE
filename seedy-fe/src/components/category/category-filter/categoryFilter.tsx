import styles from "./categoryFilter.module.css";
interface CategoryFilterProps {
  id: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryFilter({
  id,
  label,
  isSelected,
  onClick,
}: CategoryFilterProps) {
  return (
    <button
      className={`${styles.categoryButton} ${
        isSelected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
