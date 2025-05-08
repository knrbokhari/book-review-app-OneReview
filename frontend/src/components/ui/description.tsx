type Props = {
  className?: string;
  title?: string;
  details?: string | JSX.Element;
  [key: string]: unknown;
};

const Description: React.FC<Props> = ({
  title,
  details,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {title && (
        <h4 className="text-body-dark mb-2 text-base font-semibold">{title}</h4>
      )}
      {details && <p className="text-body text-sm">{details}</p>}
    </div>
  );
};

export default Description;
