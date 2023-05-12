import { getLibrary } from "@/apis/library";
import { Header } from "@/components/header";
import { LibraryCard } from "@/components/library";
import { Dropdown } from "@packages/ui";
import { useState } from "react";
import { useQuery } from "react-query";

const Library = () => {
  const [year, setYear] = useState<string>("");
  const { data } = useQuery(["dwqdqwdq", year], () => getLibrary(year));

  console.log(data);
  return (
    <>
      <Header />
      <div className="m-auto w-[1120px]">
        <p className="text-title1 mt-28">도서관</p>
        <p className="text-title4 mb-20">레주메북 목록을 담은 도서관입니다.</p>
        <div className="mb-10">
          <Dropdown
            className="w-40"
            placeholder="년도"
            lists={["2021", "2022", "2023"]}
            onClick={({ keyword }) => setYear(keyword)}
          />
        </div>
        {data &&
          !!data.data.library_document_list.length &&
          data.data.library_document_list.map((libarary) => (
            <LibraryCard {...libarary} />
          ))}
      </div>
    </>
  );
};

export default Library;
