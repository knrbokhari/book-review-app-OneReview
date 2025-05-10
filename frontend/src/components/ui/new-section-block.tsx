import cn from "classnames";
import CustomLink from "./link";

type SectionProps = {
  className?: any;
  title?: string;
  href?: string;
  button_text?: string;
  children?: React.ReactNode;
};

/**
 * UI component for a section block
 * @param {string} title - The title of the section
 * @param {string} description - The description of the section
 * @param {string} href - The href of the external page for this section
 */

const NewSectionBlock: React.FC<SectionProps> = ({
  className,
  title,
  href,
  button_text,
  children,
}) => {
  return (
    <div className={cn("pb-8", className)}>
      {title && (
        <div className="border-border-200 mb-4 flex items-center justify-between rounded-lg border bg-white p-3 shadow dark:border-gray-7 dark:bg-dark-2">
          {title && (
            <h3 className="text-heading text-lg font-semibold dark:text-white sm:text-xl">
              {title}
            </h3>
          )}
          {href && (
            <CustomLink
              href={`${href}`.replace("//", "/")}
              className="justify-end border border-gray-400 px-3 py-2 text-base font-semibold transition-colors md:hover:border-green-500 md:hover:text-[#32b4fc]"
            >
              {button_text || "See More"}
            </CustomLink>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default NewSectionBlock;
