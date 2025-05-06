import cn from "classnames";

interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = ({ className, text }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {text && (
        <h3 className="text-body my-7 w-full text-center text-xl font-semibold">
          {text}
        </h3>
      )}
    </div>
  );
};

export default NotFound;
