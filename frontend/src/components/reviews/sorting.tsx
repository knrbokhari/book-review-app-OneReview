import Select from "@/components/ui/select/select";
import { useState, useEffect } from "react";
import { useIsRTL } from "@/lib/locals";
import { useRouter } from "next/navigation";
interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: string;
  orderBy: string;
  sortedBy: "asc" | "desc";
}
const plans: Plan[] = [
  {
    id: "1",
    key: "sorting",
    label: "Recent",
    value: "created_at",
    orderBy: "created_at",
    sortedBy: "desc",
  },
  {
    id: "2",
    key: "sorting",
    label: "Ratings: Low to High",
    value: "l2h",
    orderBy: "rating",
    sortedBy: "asc",
  },
  {
    id: "3",
    key: "sorting",
    label: "Ratings: High to Low",
    value: "h2l",
    orderBy: "rating",
    sortedBy: "desc",
  },
];

const Sorting = () => {
  const router = useRouter();
  const { isRTL } = useIsRTL();
  const [selected, setSelected] = useState();
  // () =>
  //   plans.find((plan) => plan.orderBy === router.query.orderBy) ?? plans[0],

  // useEffect(() => {
  //   if (!router.query.orderBy) {
  //     setSelected(plans[0]);
  //   }
  // }, [router.query.orderBy]);

  function handleChange(values: Plan) {
    const { orderBy, sortedBy } = values;
    // router.push(
    //   {
    //     pathname: router.pathname,
    //     query: {
    //       ...router.query,
    //       orderBy,
    //       sortedBy,
    //     },
    //   },
    //   undefined,
    //   { scroll: false },
    // );
    // setSelected(values);
  }

  return (
    <div className="flex items-center">
      <span className="text-body min-w-[50px] text-sm ltr:mr-2 rtl:ml-2">
        Sort By:
      </span>
      <Select
        defaultValue={selected}
        isRtl={isRTL}
        isMinimal={true}
        isSearchable={false}
        options={plans}
        width={200}
        // @ts-ignore
        onChange={handleChange}
      />
    </div>
  );
};

export default Sorting;
