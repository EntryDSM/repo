import { getLibrary } from "@/apis/library";
import { Header } from "@/components/header";
import { LibraryCard } from "@/components/library";
import { Dropdown, dropdownAll } from "@packages/ui";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Library = () => {
  const [year, setYear] = useState<string>("");
  const { data } = useQuery(["dwqdqwdq", year], () => getLibrary(year));

  console.log(data);
  return (
    <>
      <Header />
      <div className="m-auto max-w-[1120px] px-[40px] sm:px-[20px] my-40">
        <p className="text-title1 mt-[120px] mb-[10px]">도서관</p>
        <p className="text-title4 mb-[80px]">
          레주메북 목록을 담은 도서관입니다.
        </p>
        <div className="mb-10">
          <Dropdown
            className="w-40"
            placeholder="년도"
            value={year}
            lists={["전체", "2021", "2022", "2023"]}
            onClick={({ keyword }) => setYear(dropdownAll(keyword))}
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          {data &&
            !!data.data.library_document_list.length &&
            data.data.library_document_list.map((libarary) => (
              <LibraryCard key={libarary.id} {...libarary} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Library;
