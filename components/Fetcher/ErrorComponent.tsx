import { Update } from "@mui/icons-material";
import { Button } from "@mui/material";

import styles from "./ErrorComponent.module.scss";

type ErrorComponentProps = {
  onReload: () => void;
};

const ErrorComponent = ({ onReload }: ErrorComponentProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Failed to load data</p>
      <p className={styles.subtitle}>
        Error occurred while loading. Try again.
      </p>
      <Button
        variant="outlined"
        color="error"
        startIcon={<Update />}
        onClick={onReload}
      >
        Reload page
      </Button>
    </div>
  );
};

export default ErrorComponent;
