import styles from "./spinner.module.css";
import cn from "classnames";

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

const Spinner = (props: Props) => {
  const { className, showText = true, text = "Loading", simple } = props;
  return (
    <>
      {simple ? (
        <span className={cn(className, styles.simple_loading)} />
      ) : (
        <span
          className={cn(
            "flex h-screen w-full flex-col items-center justify-center",
            className,
          )}
        >
          <span className={styles.loading} />

          {showText && (
            <h3 className="text-body text-lg font-semibold italic">{text}</h3>
          )}
        </span>
      )}
    </>
  );
};

interface SpinnerPops {
  className?: string;
}

export const SpinnerLoader = (props: SpinnerPops) => {
  const { className } = props;
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-transparent border-t-[#32b4fc]",
        className,
      )}
    />
  );
};

export default Spinner;

interface Props {
  className?: string;
  text?: string;
  showText?: boolean;
  simple?: boolean;
}

export const Loader = (props: Props) => {
  const { className, showText = true, text = "Loading...", simple } = props;
  return (
    <>
      {simple ? (
        <div className={cn(className, styles.simple_loading)} />
      ) : (
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center",
            className,
          )}
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className={styles.loading} />

          {showText && (
            <h3 className="text-body text-lg font-semibold italic">{text}</h3>
          )}
        </div>
      )}
    </>
  );
};
