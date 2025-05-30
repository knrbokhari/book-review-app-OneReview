import cn from "classnames";
import { LabelHTMLAttributes } from "react";

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <label
      className={cn(
        "text-body-dark mb-3 block text-sm font-semibold leading-none",
        className,
      )}
      {...rest}
    />
  );
};

export default Label;
