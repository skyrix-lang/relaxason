import { FC } from "react";
import { Flex, Text, Title } from "@mantine/core";
import styles from "./../../styles/Contact.module.css";

interface SuccessAnimationProps {
  style?: React.CSSProperties;
}

const SuccessAnimation: FC<SuccessAnimationProps> = ({ style }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h={300}
      className={styles.successMessage}
      style={style}
    >
      <div className={styles.successContainer}>
        <div className={styles.successCheckmark}>
          <div className={styles.checkIcon}>
            <span className={`${styles.iconLine} ${styles.lineTip}`}></span>
            <span className={`${styles.iconLine} ${styles.lineLong}`}></span>
            <div className={styles.iconCircle}></div>
            <div className={styles.iconFix}></div>
          </div>
        </div>
        <Title order={3} mt="md" style={{ color: "#1A9E8E" }}>
          Message Envoyé !
        </Title>
        <Text ta="center" mt="sm" size="lg">
          Merci pour votre message. Je vous répondrai dès que possible.
        </Text>
      </div>
    </Flex>
  );
};

export default SuccessAnimation;
