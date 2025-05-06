import classNames from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export interface LinkProps extends NextLinkProps {
  className?: string;
  title?: string;
  target?: string;
  variant?: "button";
  children: any;
}

const Link: React.FC<LinkProps> = ({
  children,
  variant,
  title,
  target,
  className,
  ...props
}) => {
  return (
    <NextLink {...props}>
      <a
        className={classNames(
          {
            "bg-accent text-light hover:bg-accent-hover focus:ring-accent-700' inline-flex h-9 flex-shrink-0 items-center justify-center rounded border border-transparent px-3 py-0 text-sm font-semibold leading-none outline-none transition duration-300 ease-in-out focus:shadow focus:outline-none focus:ring-1":
              variant === "button",
          },
          className,
        )}
        title={title}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
