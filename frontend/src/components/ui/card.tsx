import cn from "classnames";

type Props = {
  className?: string;
  [key: string]: unknown;
};
const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded bg-white p-5 shadow dark:bg-gray-dark md:p-8",
        className,
      )}
      {...props}
    />
  );
};

export default Card;
