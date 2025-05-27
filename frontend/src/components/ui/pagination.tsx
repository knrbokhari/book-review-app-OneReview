import { ChevronLeft, ChevronRight } from "lucide-react";
import RCPagination, { PaginationProps } from "rc-pagination";
import "rc-pagination/assets/index.css";

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <RCPagination
      nextIcon={<ChevronRight />}
      prevIcon={<ChevronLeft />}
      {...props}
      showTitle={false}
    />
  );
};

export default Pagination;
