import { useCategoryListQuery } from "@/apis/category";
import { useEffect, useState } from "react";
import { Control, useFormState, useWatch } from "react-hook-form";
import Label from "../ui/label";
import SelectInput from "../ui/select/select-input";
import { useAuthorListQuery } from "@/apis/authors";
import { usePublisherListQuery } from "@/apis/publisher";

interface Props {
  control: Control<any>;
  setValue: any;
}

const BookPublisherInput = ({ control, setValue }: Props) => {
  const [search, setSearch] = useState("");

  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (dirtyFields?.type) {
      setValue("publisher", "");
    }
  }, []);

  const { publishers, loading } = usePublisherListQuery({
    limit: 100,
    page: 1,
    name: search,
  });

  const onSearch = (e: string) => {
    if (e.length > 0) {
      setSearch(e);
    }
  };

  return (
    <div className="mb-5">
      <Label>
        Publisher<span className="text-red">*</span>
      </Label>
      <SelectInput
        name="publisher"
        isMulti={false}
        control={control}
        getOptionLabel={(option: any) => option?.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={publishers}
        isLoading={loading}
        onInputChange={(e: any) => onSearch(e)}
        onBlur={(e: any) => {
          setSearch("");
        }}
      />
    </div>
  );
};

export default BookPublisherInput;
